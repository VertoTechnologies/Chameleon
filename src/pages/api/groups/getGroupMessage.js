import dbConnect from "../../../middleware/mongodb";
import Chat from "../../../models/Chat";
import GroupMessage from "../../../models/GroupMessage";
import User from "../../../models/user";
import mongoose from 'mongoose';

export default async function getGroupMessage(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { chatId } = req.query;

  if (!chatId) {
    return res.status(400).json({ message: "Missing required chatId" });
  }

  if (!mongoose.Types.ObjectId.isValid(chatId)) {
    return res.status(400).json({ message: "Invalid chatId" });
  }

  try {
    await dbConnect();

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const messages = await GroupMessage.find({ Chat: chat._id });
    const messageWithSenders = await Promise.all(messages.map(async (message) => {
      const sender = await User.findById(message.sender);
      return {
        ...message.toObject(),
        sender: {
          userId: sender.userId,
          name: sender.name
        }
      };
    }));

    res.status(200).json(messageWithSenders);
  } catch (error) {
    console.error("Error fetching messages", error);
    res.status(500).json({ message: "Error fetching messages" });
  }
}
