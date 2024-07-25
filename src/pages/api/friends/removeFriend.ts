import dbConnect from '@/middleware/mongodb';
import Friendship from '@/models/friendship';

// API handler to remove a friend
export default async function removeFriend(req:any, res:any) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { requesterId, recipientId } = req.body;

  try {
    await dbConnect();

    // Ensure requester and recipient are not the same
    if (requesterId === recipientId) {
      res.status(400).json({ message: 'Cannot remove self as friend' });
      return;
    }

    // Check if the friendship exists
    const friendship = await Friendship.findOne({
      $or: [
        { requester: requesterId, recipient: recipientId },
        { requester: recipientId, recipient: requesterId }
      ]
    });

    if (!friendship) {
      res.status(404).json({ message: 'Friendship not found' });
      return;
    }

    // Remove the friendship
    await Friendship.deleteOne({ _id: friendship._id });

    res.status(200).json({ message: 'Friend removed successfully' });
  } catch (error) {
    console.error("Error removing friend", error);
    res.status(500).json({ message: 'Error removing friend', error: (error as any).message });
  }
}
