import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: Date;
  imageUrl?: string;
}

const messageSchema: Schema<IMessage> = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
  },
});

const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', messageSchema);
export default Message;
