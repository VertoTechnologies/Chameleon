import User from '../models/user'; // Adjust the path according to your project structure

/**
 * Updates the user's profile picture URL in the database.
 * @param userId - The ID of the user.
 * @param profilePicUrl - The URL of the new profile picture.
 * @returns A promise that resolves when the operation is complete.
 */
export async function updateUserProfilePicture(userId: string, profilePicUrl: string) {
  try {
    await User.findByIdAndUpdate(userId, { profilePic: profilePicUrl });
  } catch (error) {
    console.error('Error updating profile picture URL:', error);
    throw new Error('Unable to update profile picture.');
  }
}