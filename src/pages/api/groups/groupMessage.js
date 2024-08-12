import dbConnect from "../../../middleware/mongodb";
import User from "../../../models/user";
import Chat from "../../../models/Chat";
import GroupMessage from "../../../models/GroupMessage";

export default async function groupMessage(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { chatId, userId, text } = req.body;

  if (!chatId || !userId || (!text)) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await dbConnect();

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const sender = await User.findOne({ userId: userId });
    if (!sender) {
      return res.status(404).json({ message: "Sender not found" });
    }

    const newMessage = new GroupMessage({
      Chat: chat._id,
      sender: sender._id,
      text,
      profilePic: sender.profilePic,
    });

    await newMessage.save();
    const populatedMessage = await newMessage.populate("sender", "name userId _id profilePic");

    res.status(201).json({
      ...populatedMessage.toObject(),
      profilePic: sender.profilePic,  
      sender: {
        userId: sender.userId,
        name: sender.name,
        _id: sender._id,
        profilePic: sender.profilePic
      }
    });
  } catch (error) {
    console.error("Error creating message", error);
    res.status(500).json({ message: "Error creating message" });
  }
}

