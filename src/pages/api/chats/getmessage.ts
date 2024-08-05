import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../middleware/mongodb';
import Chatroom from '../../../models/chatroom';

export default async function getMessages(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { chatroom: chatroomId } = req.query;

  console.log('Received query parameters:', { chatroomId });

  try {
    await dbConnect();

    // Check if a chatroom already exists between the sender and receiver
    let chatroom = await Chatroom.findOne({
      _id: chatroomId,
    });

    if (!chatroom) {
      console.log('Chatroom not found for:', { chatroomId });
      return res.status(404).json({ message: 'Chatroom not found' });
    }

    console.log('Chatroom found:', chatroom);

    // Fetch messages from the chatroom
    const messages = chatroom.messages;
    console.log('Messages:', messages);

    if (messages.length === 0) {
      // initialize empty messages array
      chatroom.messages = [];
      await chatroom.save();
    }

    res.status(200).json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
}