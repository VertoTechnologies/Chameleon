import { NextApiRequest, NextApiResponse } from 'next';
import chatroom, { IChatroom } from '@/models/chatroom';
import dbConnect from '@/middleware/mongodb';

const getChatRoom = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId1, userId2 } = req.query;

  if (!userId1 || !userId2) {
    return res.status(400).json({ message: 'Missing user IDs' });
  }

  try {
    await dbConnect();

    // Find existing chatroom
    let Chatroom: IChatroom | null = await chatroom.findOne({
      participants: { $all: [userId1, userId2] },
    });

    // If no chatroom exists, create a new one
    if (!Chatroom) {
      Chatroom = new chatroom({
        participants: [userId1, userId2],
        messages: [],
      });
      await Chatroom?.save();
    }

    res.status(200).json(Chatroom?._id);
  } catch (error) {
    console.error('Error fetching or creating chatroom:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default getChatRoom;