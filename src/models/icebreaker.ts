import mongoose, { Document, Schema } from 'mongoose';

export interface IIcebreaker extends Document {
  chatId: string;
  question: string;
}

const icebreakerSchema: Schema<IIcebreaker> = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
    unique: true, // Ensure uniqueness
  },
  question: {
    type: String,
    required: true,
  },
});

const Icebreaker = mongoose.models.Icebreaker || mongoose.model<IIcebreaker>('Icebreaker', icebreakerSchema);
export default Icebreaker;
