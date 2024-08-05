import dbConnect from "../../../middleware/mongodb";
import User from "../../../models/user";
import Chat from "../../../models/Chat";
import GroupMessage from "../../../models/GroupMessage";

export default async function groupMessage(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { chatId, userId, text, photo } = req.body; // Assuming the necessary data is passed in the body

  if (!chatId || !userId || (!text && !photo)) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await dbConnect();

    // Find the chat by chatId to ensure the chat exists
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // Find the user by senderId to ensure the user exists
    const sender = await User.findOne({userId});

    if (!sender) {
      return res.status(404).json({ message: "Sender not found" });
    }

    // Create a new message
    const newMessage = new GroupMessage({
      Chat: chat._id,
      sender: sender._id,
      text,
      photo
    });

    // Save the new message
    await newMessage.save();

    // Optionally, you could update the chat with the new message (e.g., add the message to an array of messages)
    // chat.messages.push(newMessage._id);
    // await chat.save();

    res.status(201).json(newMessage); // Send the created message as the response
  } catch (error) {
    console.error("Error creating message", error);
    res.status(500).json({ message: "Error creating message" });
  }
}
