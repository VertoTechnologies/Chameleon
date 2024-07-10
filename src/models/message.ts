import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the Message document
export interface IMessage extends Document {
  sender: mongoose.Schema.Types.ObjectId;
  text?: string;
  video?: string;
  image?: string;
  audio?: string;
  sent_at: Date;
}

// Define the Message schema using the interface
const MessageSchema: Schema<IMessage> = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: false },
  video: { type: String, required: false },
  image: { type: String, required: false },
  audio: { type: String, required: false },
  sent_at: { type: Date, default: Date.now },
});

// Export the model, checking if it already exists to avoid recompilation errors
export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);