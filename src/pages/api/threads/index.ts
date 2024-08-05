import dbConnect from '../../../middleware/mongodb';
import Thread from '../../../models/thread';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const threads = await Thread.find().sort({ createdAt: -1 });
      res.status(200).json(threads);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching threads', error });
    }
  } else if (req.method === 'POST') {
    try {
      const { authorId, content } = req.body;
      const newThread = await Thread.create({ authorId, content });
      res.status(201).json(newThread);
    } catch (error) {
      res.status(500).json({ message: 'Error creating thread', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
