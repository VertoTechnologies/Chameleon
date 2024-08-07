import mongoose from 'mongoose';

const LanguageRankSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    language: { type: String, required: true },
    level: { type: Number, required: true },
    type: { type: String, enum: ['learning', 'fluent'], required: true }, // Distinguishes between learning and fluent languages
});

const LanguageRank = mongoose.models.LanguageRank || mongoose.model('LanguageRank', LanguageRankSchema);

export default LanguageRank;
