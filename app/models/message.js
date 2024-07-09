import mongoose from 'mongoose';


const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: false },
    video: { type: String, required: false },
    image: { type: String, required: false },
    audio: { type: String, required: false },
    sent_at: { type: Date, default: Date.now },
  });

  export default mongoose.models.Message || mongoose.model('Message', MessageSchema);