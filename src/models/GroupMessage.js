// /models/chat.js
import mongoose from 'mongoose';


const messageSchema = new mongoose.Schema({
  Chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  sender: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  text: {
    type: String,
    default: '',
  },
  profilePic: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const GroupMessage = mongoose.models.GroupMessage || mongoose.model('GroupMessage', messageSchema);
export default GroupMessage;
