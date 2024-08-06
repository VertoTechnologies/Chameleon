import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../middleware/mongodb';
import Message from '../../../models/message';
import Chatroom from '../../../models/chatroom';

export default async function sendMessage(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { senderId, receiverId, message } = req.body;

  try {
    await dbConnect();

    // Check if a chatroom already exists between the sender and receiver
    let chatroom = await Chatroom.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    // If no chatroom exists, create a new one
    if (!chatroom) {
      chatroom = new Chatroom({
        participants: [senderId, receiverId],
        messages: [],
      });
      await chatroom.save();
    }

    // Create a new message
    const newMessage = new Message({ senderId, receiverId, message });
    await newMessage.save();

    // Add the new message to the chatroom's messages array
    chatroom.messages.push(newMessage);
    await chatroom.save();

    res.status(200).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
}