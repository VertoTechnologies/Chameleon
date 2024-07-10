import mongoose from "mongoose";

const RankSchema = new mongoose.Schema({
    rankId : {type: String, required: true, unique: true},
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    rank : {type: Number, required: true},
});

export default mongoose.models.Rank || mongoose.model('Rank', RankSchema);