import dbConnect from '../../../middleware/mongodb';
import User from '../../../models/user';
// import  { NextApiRequest, NextApiResponse } from 'next';
// Optional: Import authentication middleware

export default async function userProfile(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
 
  // Optional: Authenticate the request here

  // Assuming the user ID is passed as a query parameter
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    await dbConnect();

    const user = await User.findOne({userId:userId}).select('-password'); // Exclude the password field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // console.log(json(user))
    res.status(200).json(user); // Send the user profile information
  } catch (error) {
    console.error("Error fetching user profile", error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
}