import dbConnect from '../../../middleware/mongodb';
import Comment from '../../../models/comment';
import Thread from '../../../models/thread';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const thread = await Thread.findById(id);
      if (!thread) return res.status(404).json({ message: 'Thread not found' });

      const comments = await Comment.find({ threadId: id }).sort({ createdAt: -1 });
      res.status(200).json({ thread, comments });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching thread or comments', error });
    }
  } else if (req.method === 'POST') {
    try {
      const { authorId, content } = req.body;
      const newComment = await Comment.create({ threadId: new ObjectId(id as string), authorId, content });
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ message: 'Error adding comment', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
