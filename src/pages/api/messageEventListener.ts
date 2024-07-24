// pages/api/streamMessages.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ChangeStreamDocument, ConnectOptions } from 'mongodb';

let client: MongoClient | null = null;

async function initClient() {
  if (!client) {
    const uri = process.env.MONGODB_URI!;
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { friendId, userId } = req.query;

  if (!friendId || !userId) {
    return res.status(400).json({ message: 'Friend ID and User ID are required' });
  }

  const client = await initClient();
  const db = client.db('test');
  const collection = db.collection('messages');

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const pipeline = [
    {
      $match: {
        $or: [
          { 'fullDocument.senderId': userId, 'fullDocument.receiverId': friendId },
          { 'fullDocument.senderId': friendId, 'fullDocument.receiverId': userId },
        ],
      },
    },
  ];

  const changeStream = collection.watch(pipeline, { fullDocument: 'updateLookup' });

  changeStream.on('change', (next: ChangeStreamDocument) => {
    if ('fullDocument' in next) {
      res.write(`data: ${JSON.stringify(next.fullDocument)}\n\n`);
    }
  });

  req.on('close', () => {
    console.log('Connection closed');
    changeStream.close();
    res.end();
  });
}
