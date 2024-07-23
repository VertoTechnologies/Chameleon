// models/Friendship.js
import mongoose from 'mongoose';
import { friendshipStatuses } from '../constants/enums';

const FriendshipSchema = new mongoose.Schema({
  requester: { type: String, required: true },
  recipient: { type: String, required: true },
  status: {
    type: String,
    enum: friendshipStatuses,
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.models.Friendship || mongoose.model('Friendship', FriendshipSchema);