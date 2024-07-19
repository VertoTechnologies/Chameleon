
import dbConnect from '@/middleware/mongodb';
import User from '@/models/user';
import Friendship from '@/models/Friendship';
import { friendshipStatuses } from '@/constants/enums';

// API handler to add a friend
export default async function addFriend(req:any, res:any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { requesterId, recipientId } = req.body;

  try {
    await dbConnect();

    // Ensure requester and recipient are not the same
    if (requesterId === recipientId) {
      res.status(400).json({ message: 'Cannot add self as friend' });
    }

    // Check if users exist
    const requester = await User.findOne({ userId: requesterId }).select('-password');
    const recipient = await User.findOne({ userId: recipientId }).select('-password');
    if (!requester || !recipient) {
      res.status(404).json({ message: 'User not found' });
    }

    // Check if a friendship already exists
    const existingFriendship = await Friendship.findOne({
      $or: [
        { requester: requester.userId, recipient: recipient.userId },
        { requester: recipient.userId, recipient: requester.userId }
      ]
    });

    if (existingFriendship) {
      res.status(400).json({ message: 'Friendship already exists' });
    }

    // Create a new friendship
    const newFriendship = new Friendship({
      requester: requester.userId,
      recipient: recipient.userId,
      status: friendshipStatuses[0], // 0 is pending
    });

    await newFriendship.save();

    res.status(201).json({ message: 'Friend request sent successfully' });
  } catch (error) {
    console.error("Error adding friend", error);
    res.status(500).json({ message: 'Error adding friend', error: (error as any).message });
  }
}