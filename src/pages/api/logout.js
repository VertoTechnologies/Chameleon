// User Logout API handler
export default async function logout(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    await dbConnect();
  
    try {

      // send userId in the body
      const { userId } = req.body;
  
      // Set user status to offline
      await User.findOneAndUpdate({ userId }, { $set: { isOnline: false } });
  
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error("Error logging out user", error);
      res.status(500).json({ message: 'Error logging out user' });
    }
}