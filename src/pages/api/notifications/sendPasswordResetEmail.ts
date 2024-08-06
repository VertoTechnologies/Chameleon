import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const sendPasswordResetEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { toEmail, OTP } = req.body;

  if (!toEmail || !OTP) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Log only in development for debugging purposes
  if (process.env.NODE_ENV !== 'production') {
    console.log('Email User:', process.env.EMAIL_USER);
    console.log('Email Password:', process.env.EMAIL_PASS);
  }

  // Create a Nodemailer transporter using Gmail service
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Chameleon Password Recovery',
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Chameleon - OTP</title>
    </head>
    <body>
      <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2;">
        <div style="margin: 50px auto; width: 70%; padding: 20px 0;">
          <div style="border-bottom: 1px solid #eee;">
            <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600;">Chameleon</a>
          </div>
          <p style="font-size: 1.1em;">Hi,</p>
          <p>Thank you for choosing Chameleon. Use the following OTP to complete your password recovery procedure. The OTP is valid for 5 minutes.</p>
          <h2 style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">${OTP}</h2>
          <p style="font-size: 0.9em;">Regards,<br />Chameleon</p>
          <hr style="border: none; border-top: 1px solid #eee;" />
          <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300;">
          </div>
        </div>
      </div>
    </body>
    </html>`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email', error });
  }
};

export default sendPasswordResetEmail;
