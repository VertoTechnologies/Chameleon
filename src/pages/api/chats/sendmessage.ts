import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../middleware/mongodb';
import Message from '../../../models/message';


export default async function sendMessage(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { senderId, receiverId, message } = req.body;

  try {
    await dbConnect();
    const newMessage = new Message({ senderId, receiverId, message });
    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
}
