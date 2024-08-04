import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  threadId: string;
  authorId: string;
  content: string;
  createdAt: Date;
}

const commentSchema: Schema<IComment> = new mongoose.Schema({
  threadId: {
    type: String,
    required: true,
  },
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

const Comment = mongoose.models.Comment || mongoose.model<IComment>('Comment', commentSchema);
export default Comment;
