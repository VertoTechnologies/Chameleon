// pages/api/chats/sendmessage.ts
import { NextApiRequest, NextApiResponse } from 'next';
import multiparty from 'multiparty';
import dbConnect from '../../../middleware/mongodb';
import Message from '../../../models/message';
import Chatroom from '../../../models/chatroom';
import { v2 as cloudinary } from 'cloudinary';

// Initialize Cloudinary (make sure to set your environment variables for Cloudinary)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false, // Disable default body parser to handle form-data
  },
};

export default async function sendMessage(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error parsing form data' });
    }

    // Log the extracted fields and their types
    console.log('Extracted Fields:', fields);
    console.log('Extracted Files:', files);

    const senderId = fields.senderId ? fields.senderId[0] : null;
    const receiverId = fields.receiverId ? fields.receiverId[0] : null;
    const message = fields.message ? fields.message[0] : null;
    const timestamp = fields.timestamp ? new Date(fields.timestamp[0]) : new Date(); // Ensure timestamp is in Date format
    const image = files.image ? files.image[0] : null;

    // Check if required fields are present
    if (!senderId || !receiverId) {
      return res.status(400).json({ message: 'Missing required fields: senderId, receiverId, or message' });
    }

    try {
      await dbConnect();

      // Check if a chatroom already exists between the sender and receiver
      let chatroom = await Chatroom.findOne({
        participants: { $all: [senderId, receiverId] },
      });

      // If no chatroom exists, create a new one
      if (!chatroom) {
        chatroom = new Chatroom({
          participants: [senderId, receiverId],
          messages: [],
        });
      }

      // Handle image upload if an image is present
      let imageUrl = null;
      if (image) {
        const result = await cloudinary.uploader.upload(image.path);
        imageUrl = result.secure_url;
      }

      // Create a new message with image URL if present
      const newMessage = new Message({
        senderId,
        receiverId,
        message,
        timestamp,
        imageUrl,
      });

      await newMessage.save();

      // Add the new message to the chatroom
      chatroom.messages.push(newMessage);
      await chatroom.save();

      res.status(200).json(newMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}
