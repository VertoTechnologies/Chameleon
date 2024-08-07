// /models/chat.js
import mongoose, { Schema, Document } from 'mongoose';

export interface IChat extends Document {
  language: string;
  users: mongoose.Schema.Types.ObjectId[];
  groupPhoto: string; // URL or path to the group photo
}

const chatSchema: Schema<IChat> = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    unique: true,
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  groupPhoto: {
    type: String,
    required: false,
  },
});

const Chat = mongoose.models.Chat || mongoose.model<IChat>('Chat', chatSchema);
export default Chat;
