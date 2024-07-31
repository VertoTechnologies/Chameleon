import mongoose from 'mongoose';
import User from '../../../models/user'; // Adjust the path as necessary
import dbConnect from '../../../middleware/mongodb'; // Adjust the path as necessary

const DEFAULT_PROFILE_PIC_URL = 'https://thispersondoesnotexist.com/';

export default async function updateProfilePictures(req:any, res:any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await dbConnect();

  try {
    const usersWithoutProfilePic = await User.find({ profilePic: { $exists: false } });

    const updatePromises = usersWithoutProfilePic.map(user => {
      user.profilePic = DEFAULT_PROFILE_PIC_URL;
      return user.save();
    });


    // also update users with profilePic=""
    const usersWithEmptyProfilePic = await User.find({ profilePic: ""}, {profilePic: " "});
    const updatePromises2 = usersWithEmptyProfilePic.map(user => {
      user.profilePic = DEFAULT_PROFILE_PIC_URL;
      return user.save();
    });




    await Promise.all(updatePromises);
    await Promise.all(updatePromises2);

    console.log(`Updated ${usersWithoutProfilePic.length} users with default profile picture.`);
    res.status(200).json({ message: `Updated ${usersWithoutProfilePic.length} users with default profile picture.` });
  } catch (error) {
    console.error('Error updating profile pictures:', error);
    res.status(500).json({ message: 'Error updating profile pictures' });
  } finally {
    mongoose.connection.close();
  }
}