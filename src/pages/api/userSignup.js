import dbConnect from '../../app/middleware/mongodb';
import User from '../../app/models/user';
import bcrypt from 'bcryptjs';

// Function to generate a unique user ID
function generateUniqueKey() {
  let uniqueKey = Date.now().toString(36); // Base 36 timestamp
  for (let i = 0; i < 8; i++) { // Generate 8 random characters
    uniqueKey += Math.random().toString(36).charAt(2); // Append a random alphanumeric character
  }
  return uniqueKey;
}

// Sign up API handler
export default async function signUp(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Sign Up API Route Hit'); // Debugging line to ensure the route is hit
  await dbConnect();

  const { name, email, password, dateOfBirth, userDescription, profilePic, userInterests } = req.body;

  // Validate the input
  if (!email || !password || !name || !dateOfBirth) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
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
      userDescription,
      profilePic,
      userInterests,
    });

    res.status(201).json({ message: 'User created successfully', userId: user.userId });
    console.log("User created");
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ message: 'Error creating user' });
  }
}