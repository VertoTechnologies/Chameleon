import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../middleware/mongodb';
import Message from '../../../models/message';
import Chatroom from '../../../models/chatroom';

export default async function editMessage(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { messageId, newMessage } = req.body;

  try {
    await dbConnect();

    const message = await Message.findById(messageId);
    if (!message) {
        console.log('Message not found');
      return res.status(404).json({ message: 'Message not found' });
    }

    message.message = newMessage;
    await message.save();

    res.status(200).json(message);
  } catch (error) {
    console.error('Error editing message:', error);
    res.status(500).json({ message: 'Error editing message' });
  }
}