import dbConnect from '../../app/middleware/mongodb';
import User from '../../app/models/user';
import { interests } from '../../app/models/enums';


function generateUniqueKey() {
  let uniqueKey = Date.now().toString(36); // Base 36 timestamp
  for (let i = 0; i < 8; i++) { // Generate 8 random characters
    uniqueKey += Math.random().toString(36).charAt(2); // Append a random alphanumeric character
  }
  return uniqueKey;
}

export default async function handler(req, res) {
  console.log('API Route Hit'); // Debugging line to ensure the route is hit
  await dbConnect();

  const userID = generateUniqueKey();

  const users = [{
    userId: userID,
    name: "John Doe",
    email: "john.doe4@example.com",
    password: "password123",
    dateOfBirth: "1990-01-01",
    userDescription: "Avid music enthusiast and coffee lover.",
    profilePic: "https://example.com/path/to/johns-profile-pic.jpg",
    userInterests: [interests[14], interests[15]],
  }];

  try {
    await User.create(users);
    res.json({ message: 'Collections ensured/created with dummy data' });
    console.log("Users created");
  } catch (error) {
    console.error("Users not created", error);
    res.status(500).json({ message: 'Error creating users' });
  }
}
