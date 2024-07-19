
import dbConnect from "@/middleware/mongodb";
import Friendship from "@/models/Friendship";

// API handler to update the status of a friend request
export default async function handleFriendRequest(req: any, res: any) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const { friendshipId, newStatus } = req.body;
  
    try {
      await dbConnect();
  
      // Find the friendship entry by ID
      const friendship = await Friendship.findById(friendshipId);
      if (!friendship) {
        res.status(404).json({ message: 'Friend request not found' });
      }
  
      // Handle rejected friend request
      if (newStatus === 'rejected') {
        await Friendship.deleteOne({ _id: friendshipId });
        return res.status(200).json({ message: 'Friend request rejected' });
      }
  
      // Handle accepted friend request
      if (newStatus === 'accepted') {
        friendship.status = 'accepted';
        await friendship.save();
        return res.status(200).json({ message: 'Friend request accepted' });
      }
  
      throw new Error('Invalid status update');
    } catch (error) {
      console.error("Error updating friend request", error);
      res.status(500).json({ message: 'Error updating friend request', error: (error as any).message });
    }
  }
  