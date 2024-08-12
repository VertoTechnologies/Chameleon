import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../middleware/mongodb"; // Adjust the import based on your project structure
import User from "../../../models/user";
import Friendship from "@/models/friendship";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  try {
    // Get the userId from the query parameters
    const { userId } = req.query;

    // Check if userId is provided
    if (!userId || typeof userId !== "string") {
      console.error("User ID is not provided or is not a string");
      return res
        .status(400)
        .json({ message: "User ID is required and must be a string" });
    }

    console.log(`Fetching online users excluding userId: ${userId}`);

    const friendships = await Friendship.find({
      $or: [{ requester: userId }, { recipient: userId }],
      status: "accepted",
    });

    // Extract user IDs of friends
    const friendIds = friendships.map((friendship) =>
      friendship.requester.toString() === userId
        ? friendship.recipient
        : friendship.requester
    );

    // Fetch online users excluding the current user
    const onlineUsers = await User.find({
      isOnline: true,
      userId: { $in: friendIds },
    }).select("userId name profilePic"); // Only select relevant fields

    console.log("Online users fetched:", onlineUsers);

    res.status(200).json(onlineUsers);
  } catch (error) {
    console.error("Error fetching online users:", error);
    // Ensure error.message is always defined
    res
      .status(500)
      .json({
        message: "Error fetching online users",
        error: (error as Error).message || "Unknown error",
      });
  }
}
