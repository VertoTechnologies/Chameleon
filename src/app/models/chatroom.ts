import mongoose, { Document, Schema } from "mongoose";
import MessageSchema, { IMessage } from "./message";

// Define an interface for the Chatroom document
export interface IChatroom extends Document {
  participants: mongoose.Schema.Types.ObjectId[];
  messages: IMessage[];
  created_at: Date;
  updated_at: Date;
}

// Define the Chatroom schema using the interface
const ChatroomSchema: Schema<IChatroom> = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  messages: [MessageSchema],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Export the model, checking if it already exists to avoid recompilation errors
export default mongoose.models.Chatroom || mongoose.model<IChatroom>('Chatroom', ChatroomSchema);