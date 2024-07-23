
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../middleware/mongodb';
import Message from '../../models/message';
export default async function getMessages(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { senderId, receiverId } = req.query;

  try {
    await dbConnect();
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ]
    }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
}
