import dbConnect from '@/middleware/mongodb';
import User from '@/models/user';
import Friendship from '@/models/friendship';
import { friendshipStatuses } from '@/constants/enums';
import nodemailer from 'nodemailer';

// Helper function to send friend request email
const sendFriendRequestEmail = async (toEmail: string, fromUserName: string, emailText: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Notification from Chameleon!',
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Chameleon - Friend Request</title>
    </head>
    <body>
      <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2;">
        <div style="margin: 50px auto; width: 70%; padding: 20px 0;">
          <div style="border-bottom: 1px solid #eee;">
            <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600;">Chameleon</a>
          </div>
          <p style="font-size: 1.1em;">Hi,</p>
          <p style="font-size: 1em;">${fromUserName} wants to connect with you on Chameleon!</p>
          <p style="font-size: 1em;">${emailText}</p>
          <p style="font-size: 0.9em;">Regards,<br />The Chameleon Team</p>
          <hr style="border: none; border-top: 1px solid #eee;" />
          <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300;"></div>
        </div>
      </div>
    </body>
    </html>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// API handler to add a friend
export default async function addFriend(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { requesterId, recipientId } = req.body;

  console.log('Received request:', { requesterId, recipientId });

  // Validate the presence of required fields
  if (!requesterId || !recipientId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await dbConnect();

    // Ensure requester and recipient are not the same
    if (requesterId === recipientId) {
      return res.status(400).json({ message: 'Cannot add self as friend' });
    }

    // Check if users exist
    const requester = await User.findOne({ userId: requesterId }).select('-password');
    const recipient = await User.findOne({ userId: recipientId }).select('-password');

    if (!requester || !recipient) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Log the recipient's email
    console.log('Recipient email:', recipient.email);

    // Check if a friendship already exists
    const existingFriendship = await Friendship.findOne({
      $or: [
        { requester: requester.userId, recipient: recipient.userId },
        { requester: recipient.userId, recipient: requester.userId }
      ]
    });

    if (existingFriendship) {
      return res.status(400).json({ message: 'Friendship already exists' });
    }

    // Create a new friendship
    const newFriendship = new Friendship({
      requester: requester.userId,
      recipient: recipient.userId,
      status: friendshipStatuses[0], // 0 is pending
    });

    await newFriendship.save();

    // Send email notification
    const senderName = requester.name; // Adjust according to your profile data
    const emailText = `Ready to Connect with People?<br>${senderName} wants to be your New Language Buddy! Add them back and learn together.`;

    await sendFriendRequestEmail(recipient.email, senderName, emailText);

    // Respond with a success message
    return res.status(201).json({
      message: 'Friend request sent successfully',
      recipientEmail: recipient.email
    });
  } catch (error) {
    console.error("Error adding friend:", error);
    return res.status(500).json({ message: 'Error adding friend', error: (error as any).message });
  }
}
