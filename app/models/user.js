// /app/models/user.js
import mongoose from 'mongoose';
import { interests } from './enums';

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  userDescription: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  },
  userInterests: {
    type: [String],
    enum: interests,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
