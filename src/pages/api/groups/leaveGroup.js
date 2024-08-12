import dbConnect from "../../../middleware/mongodb";
import Chat from "../../../models/Chat";
import User from "../../../models/user";

export default async function leaveGroup(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { chatId, userId } = req.body;

  if (!chatId || !userId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await dbConnect();

    // Ensure the user exists
    const user = await User.findOne({userId});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the chat by ID
    console.log('work')
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // Check if the user is part of the chat
    if (!chat.users.includes(user._id)) {
      return res.status(400).json({ message: "User is not part of the chat" });
    }

    // Remove the user from the chat
    chat.users = chat.users.filter(userIdObj => !userIdObj.equals(user._id));

    // Save the updated chat
    await chat.save();

    res.status(200).json({ message: "User removed from the chat successfully" });
  } catch (error) {
    console.error("Error leaving group", error);
    res.status(500).json({ message: "Error leaving group" });
  }
}
