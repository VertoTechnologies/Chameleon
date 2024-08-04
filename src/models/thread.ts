import mongoose, { Document, Schema } from 'mongoose';

export interface IThread extends Document {
  authorId: string;
  content: string;
  createdAt: Date;
}

const threadSchema: Schema<IThread> = new mongoose.Schema({
  authorId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Thread = mongoose.models.Thread || mongoose.model<IThread>('Thread', threadSchema);
export default Thread;
