import dbConnect from "../../../middleware/mongodb";
import User from "../../../models/user";
import Chat from '../../../models/Chat';

export default async function getGroups(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId } = req.query; // Assuming the user ID is passed as a query parameter

  if (!userId) {
    return res.status(400).json({ message: "Missing required userId" });
  }

  try {
    await dbConnect();

    // Find the user by userId to ensure the user exists
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all chats that include the current user's userId and populate user details
    const userChats = await Chat.find({ users: user._id }).populate({
      path: 'users',
      select: 'name profilePicture', // Select only the fields you need
    });

    res.status(200).json(userChats); // Send the list of user chats with populated user details
  } catch (error) {
    console.error("Error fetching user chats", error);
    res.status(500).json({ message: "Error fetching user chats" });
  }
}
