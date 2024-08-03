import dbConnect from '../../../middleware/mongodb';
import User from '../../../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

// Define a Zod schema for login validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(1, { message: "Password is required" })
});

// User Login API handler
export default async function login(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Login API Route Hit');
  await dbConnect();

  try {
    // Parse and validate the request body using Zod
    const { email, password } = loginSchema.parse(req.body);

    console.log('Email:', email, 'Password:', password);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
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
    if (error instanceof z.ZodError) {
      // If the error is a Zod validation error, send a 400 response with the error details
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }

    console.error("Error logging in user", error);
    res.status(500).json({ message: 'Error logging in user' });
  }
}
