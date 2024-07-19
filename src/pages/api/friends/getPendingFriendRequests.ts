import dbConnect from "@/middleware/mongodb";
import User from "@/models/user";
import Friendship from "@/models/Friendship";

export default async function getPendingFriendRequests(req: any, res: any) {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const { userId } = req.query;
  
    try {
      await dbConnect();
  
      // Query for pending requests
      const pendingRequests = await Friendship.find({
        recipient: userId,
        status: 'pending'
      });
  
      // Extract requester IDs
      const requesterIds = pendingRequests.map(request => request.requester);
  
      // Query for requester details
      const requestersDetails = await User.find({
        'userId': { $in: requesterIds }
      }).select('-password'); // Exclude password from the details
      console.log
      // Create a map of requester details for easy lookup
      const requesterDetailsMap = requestersDetails.reduce((acc, requester) => {
        acc[requester.userId] = {
            name: requester.name,
            profilePic: requester.profilePic,
        }
        return acc;
      }, {});
  
      // Combine the data
      const requestsDetails = pendingRequests.map(request => ({
        id: request._id,
        requesterId: request.requester,
        requesterDetails: requesterDetailsMap[request.requester], // Lookup the details from the map
        status: request.status,
        createdAt: request.created_at,
      }));
  
      res.status(200).json({ pendingRequests: requestsDetails });
    } catch (error) {
      console.error("Error fetching pending friend requests", error);
      res.status(500).json({ message: 'Error fetching pending friend requests', error: (error as any).message });
    }
  }