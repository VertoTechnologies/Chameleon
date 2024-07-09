import mongoose from "mongoose";
import MessageSchema from "./message";

const ChatroomSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: [MessageSchema],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  });
  
export default mongoose.models.Chatroom || mongoose.model('Chatroom', ChatroomSchema);