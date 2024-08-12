import dbConnect from '../../../middleware/mongodb';
import User from '../../../models/user';
import LanguageRank from "../../../models/rank";
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

    const learningLanguageRanks = await Promise.all(
      user.learningLanguagess.map(async (language) => {
        const rank = await LanguageRank.findOne({ userId: user._id, language, type: 'learning' });
        return rank ? { language, level: rank.level } : null;
      })
    ).then(results => results.filter(rank => rank !== null));

    const fluentLanguageRanks = await Promise.all(
      user.fluentLanguagess.map(async (language) => {
        const rank = await LanguageRank.findOne({ userId: user._id, language, type: 'fluent' });
        return rank ? { language, level: rank.level } : null;
      })
    ).then(results => results.filter(rank => rank !== null));

    const updatedUser = {
      ...user._doc,
      learningLanguageRanks,
      fluentLanguageRanks
    };
    // console.log(json(user))
    res.status(200).json(updatedUser); // Send the user profile information
  } catch (error) {
    console.error("Error fetching user profile", error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
}