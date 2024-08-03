import dbConnect from '../../../middleware/mongodb';
import User from '../../../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// User Login API handler
export default async function login(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Login API Route Hit');
  await dbConnect();

  console.log(req.body);
  const { email, password } = req.body;

  console.log('Email:', email, 'Password:', password);

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Set user status to online
    await User.findOneAndUpdate({ email }, { $set: { isOnline: true } });

    const token = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Token:', token);
    console.log('User ID:', user.userId);

    // Respond with success message
    res.status(200).json({ message: 'Login successful', userId: user.userId, sessionToken: token, userName: user.name });
    
    console.log("User logged in");
  } catch (error) {
    console.error("Error logging in user", error);
    res.status(500).json({ message: 'Error logging in user' });
  }
}
