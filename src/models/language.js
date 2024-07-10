import mongoose from "mongoose";
import { languages } from "./enums";

const LanguageSchema = new mongoose.Schema({
    languageId: {type: String, required: true, unique: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    languageName: {type: String, required: true, enum: languages},
    fluentLanguage: {type: Boolean, required: true},
    nativeLanguage: {type: Boolean, required: true},
    learningLanguage: {type: Boolean, required: true},
});

export default mongoose.models.Language || mongoose.model('Language', LanguageSchema);