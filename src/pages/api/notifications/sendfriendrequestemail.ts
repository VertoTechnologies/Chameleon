import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const sendFriendRequestEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { toEmail, fromUserName, emailText } = req.body;

  if (!toEmail || !fromUserName) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  console.log('Email User:', process.env.EMAIL_USER);
  console.log('Email Password:', process.env.EMAIL_PASS);

  // Create a Nodemailer transporter using Gmail service
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true, 
    port: 465,
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS, // Your Gmail password or App Password
    },
  });

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Notification from Chameleon!',
    text: emailText,
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
          <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300;">
          </div>
        </div>
         </div>
    </body>
    </html>`,
  }

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email', error:(error) });
  }
};

export default sendFriendRequestEmail;
