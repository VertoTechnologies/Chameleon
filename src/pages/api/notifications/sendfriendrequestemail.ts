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
    html: `<p>Hello! </p><p>${emailText}</p>`,
  };

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
