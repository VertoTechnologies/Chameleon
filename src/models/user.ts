// /app/models/user.ts
import mongoose, { Document, Schema } from 'mongoose';
import { interests, Interest, Language } from '../constants/enums';

// Define an interface for the User document that extends mongoose.Document
export interface IUser extends Document {
  userId: string;
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  userDescription: string;
  profilePic: string;
  userInterests: Interest[];
  nativeLanguage: Language;
  fluentLanguagess: Language[];
  learningLanguagess: Language[];
  purpose: string;
  learningMethods: string;
  usageFrequency: string;
  isOnline : boolean;
}

const userLanguageRankSchema: Schema<any> = new mongoose.Schema({
  languages: [String],
  rank: { type: mongoose.Schema.Types.ObjectId, ref: 'LanguageRank' }
})

// Define the User schema using the interface
const userSchema: Schema<IUser> = new mongoose.Schema({
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
    required: false,
  },
  profilePic: {
    type: String,
    required: false,
  },
  userInterests: {
    type: [String],
    enum: interests, 
    required: false,
  },
  nativeLanguage: {
    type: String,
    required: false,
  },
  fluentLanguagess: {
    type: [String],
    required: false,
  },
  learningLanguagess: {
    type: [String],
    required: false,
  },
  purpose: {
    type: String,
    required: false,
  },
  learningMethods: {
    type: String,
    required: false,
  },
  usageFrequency: {
    type: String,
    required: false,
  },
  isOnline: {
    type: Boolean,
    required: true,
    default: false,
  }

});

// Export the model, checking if it already exists to avoid recompilation errors
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;