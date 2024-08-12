import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../middleware/mongodb';
import Message from '../../../models/message';
import Chatroom from '../../../models/chatroom';

export default async function deleteMessage(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { messageId, chatroomId } = req.body;

  try {
    await dbConnect();

    const message = await Message.findByIdAndDelete(messageId);
    if (!message) {
        console.log('Message not found');
        console.log(messageId);
      return res.status(404).json({ message: 'Message not found' });
    }

    const chatroom = await Chatroom.findById(chatroomId);
    if (chatroom) {
      chatroom.messages.pull(messageId);
      await chatroom.save();
    }

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Error deleting message' });
  }
}