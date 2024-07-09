// models/User.js
import mongoose from 'mongoose';
import {interests} from './enums';

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: {type:String, required: true},
  userDescription: {type:String, required: true},
  profilePic: {type:String, required: true},
  userInterests: {type:Array, enum: interests, required: true},// list of strings
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
