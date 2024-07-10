// app/api/users/route.js
import dbConnect from '../../../utils/mongodb';
import User from '../../../models/user';

export async function GET(request) {
  await dbConnect();
  const users = await User.find({});
  return new Response(JSON.stringify(users), { status: 200 });
}

export async function POST(request) {
  await dbConnect();
  const data = await request.json();
  const newUser = new User(data);
  await newUser.save();
  return new Response(JSON.stringify(newUser), { status: 201 });
}
