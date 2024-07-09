import dbConnect from '../../app/middleware/mongodb';
import User from '../../app/models/user';
import { interests } from '../../app/models/enums';

export default async function handler(req, res) {
  console.log('API Route Hit'); // Debugging line to ensure the route is hit
  await dbConnect();

  const users = [{
    userId: "user1",
    name: "John Doe",
    email: "john.doe@example.com",
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
