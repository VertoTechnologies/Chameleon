import dbConnect from "@/middleware/mongodb";
import User from "@/models/user";
import Friendship from "@/models/friendship";

export default async function getFriendsList(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  let { userId } = req.query;

  try {
    
    await dbConnect();

    // Find all accepted friendships where the user is either the requester or the recipient
    const friendships = await Friendship.find({
      $or: [{ requester: userId }, { recipient: userId }],
      status: 'accepted'
    });

    // Extract user IDs of friends
    const friendIds = friendships.map(friendship => 
      friendship.requester.toString() === userId ? friendship.recipient : friendship.requester
    );

    // Fetch user details for each friend
    const friendsDetails = await User.find({
      'userId': { $in: friendIds }
    }).select('-password');

    res.status(200).json({ friends: friendsDetails });
  } catch (error) {
    console.error("Error fetching friends list", error);
    res.status(500).json({ message: 'Error fetching friends list', error: (error as any).message });
  }
}