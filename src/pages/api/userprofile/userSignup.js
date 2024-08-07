import dbConnect from '../../../middleware/mongodb';
import User from '../../../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// Function to generate a unique user ID
function generateUniqueKey() {
  let uniqueKey = Date.now().toString(36); 
  for (let i = 0; i < 8; i++) { // Generate 8 random characters
    uniqueKey += Math.random().toString(36).charAt(2); // Append a random alphanumeric character
  }
  return uniqueKey;
}

// Function to calculate age
function _calculateAge(birthday) {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs); // milliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const signUpSchema = z.object({
  name: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  dateOfBirth: z.string().refine(date => {
    const age = _calculateAge(new Date(date));
    return age >= 18;
  }, { message: "User must be at least 18 years old" })
});

// Sign up API handler
export default async function signUp(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Sign Up API Route Hit'); // Debugging line to ensure the route is hit
  await dbConnect();

  try {
    // Parse and validate the request body using Zod
    const { name, email, password, dateOfBirth } = signUpSchema.parse(req.body);

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate a unique user ID
    const uniqueId = generateUniqueKey();

    // Create the user
    const user = await User.create({
      userId: uniqueId,
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'User created successfully', userId: user.userId, jwtToken: token });
    console.log("User created");

  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => err.message);
      return res.status(400).json({ message: errorMessages[0] });
    }
    console.error("Error creating user", error);
    res.status(500).json({ message: 'Error creating user' });
  }
}
