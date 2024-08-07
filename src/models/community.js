import mongoose from "mongoose";

const CommunitySchema = new mongoose.Schema({
    communtiyId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    communityDescription: { type: String, required:false },
    chatrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chatroom' }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
   
  });
  
  export default mongoose.models.Community || mongoose.model('Community', CommunitySchema);