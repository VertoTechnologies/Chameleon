import dbConnect from '../../../middleware/mongodb';
import User from '../../../models/user';
import jwt from 'jsonwebtoken';

import bcrypt from 'bcryptjs';

// Function to generate a unique user ID
function generateUniqueKey() {
  let uniqueKey = Date.now().toString(36); // Base 36 timestamp
  for (let i = 0; i < 8; i++) { // Generate 8 random characters
    uniqueKey += Math.random().toString(36).charAt(2); // Append a random alphanumeric character
  }
  return uniqueKey;
}

function _calculateAge(birthday) { // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}


function validateFields(updateData) {
  const errors = {};
  if (updateData.email && !/^\S+@\S+\.\S+$/.test(updateData.email)) {
    errors.email = "Invalid email format";
  }
  // Add more validation rules as needed
  if (updateData.name && updateData.name.length < 3) {
    errors.name = "Username must be at least 3 characters long";
  }
  if (updateData.password && updateData.password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }
  if (updateData.dateOfBirth) {
    const age = _calculateAge(new Date(updateData.dateOfBirth));
    if (age < 18) {
      errors.dateOfBirth = "User must be at least 18 years old";
    }
  }

  // Add more validation rules for other fields as needed

  return errors;
}

// Sign up API handler
export default async function signUp(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Sign Up API Route Hit'); // Debugging line to ensure the route is hit
  await dbConnect();

  const { name, email, password, dateOfBirth} = req.body;

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

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate a unique user ID
    const uniqueId = generateUniqueKey();
    const userCheck = {
      userId: uniqueId,
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
    };
    const validationErrors = validateFields(userCheck);
    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).json({ message: "Validation failed", errors: validationErrors });
    }
    // Create the user
    const user = await User.create({
      userId: uniqueId,
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
    });

    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).json({ message: "Validation failed", errors: validationErrors });
    }


    const token = jwt.sign(

      { userId: user._id },
      process.env.JWT_SECRET, // Ensure you have a JWT_SECRET in your .env
      { expiresIn: '1h' }

    ); 

    res.status(201).json({ message: 'User created successfully', userId: user.userId, jwtToken: token});
    console.log("User created");

   
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ message: 'Error creating user' });
  }
}