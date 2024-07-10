import dbConnect from '../../app/middleware/mongodb';
import User from '../../app/models/user';
import bcrypt from 'bcryptjs';

// User Login API handler
export default async function login(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Login API Route Hit'); // Debugging line to ensure the route is hit
  await dbConnect();

  const { email, password } = req.body;

  // Validate the input
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Respond with success message (In real scenario, generate a token here)
    res.status(200).json({ message: 'Login successful', userId: user.userId });
    console.log("User logged in");
  } catch (error) {
    console.error("Error logging in user", error);
    res.status(500).json({ message: 'Error logging in user' });
  }
}