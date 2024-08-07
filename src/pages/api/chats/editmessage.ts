import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../middleware/mongodb';
import Chatroom from '../../../models/chatroom';

export default async function editMessage(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { chatroomId, messageId, newMessage } = req.body;
  console.log('Edit request received:', { chatroomId, messageId, newMessage });

  try {
    await dbConnect();
    console.log('Database connected');

    const chatroom = await Chatroom.findById(chatroomId);
    if (!chatroom) {
      console.log('Chatroom not found');
      return res.status(404).json({ message: 'Chatroom not found' });
    }

    console.log('Chatroom messages:', chatroom.messages);
    // Assuming chatroom.messages is an array
    const message = chatroom.messages.find((msg: any) => msg._id.toString() === messageId);
    console.log('Found message:', message);
    if (!message) {
      console.log('Message not found');
      return res.status(404).json({ message: 'Message not found' });
    }

    console.log('Old message content:', message.message);
    message.message = newMessage;
    console.log('New message content:', message.message);

    const savedChatroom = await chatroom.save();
    console.log('Chatroom after save:', savedChatroom);

    console.log('Message updated successfully');
    return res.status(200).json({ message: 'Message updated successfully' });
  } catch (error) {
    console.error('Error editing message:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}