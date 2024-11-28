const mongoose = require('mongoose');
const Image = require('../../../helpers/mongodb/Image');
const { DEFAULT_VALIDATION } = require('../../../helpers/mongodb/mongooseValidation.js');

// הגדרת המודל של הפוסט
const postSchema = new mongoose.Schema({
    title: DEFAULT_VALIDATION,
    postStatus: { ...DEFAULT_VALIDATION, maxLength: 1024, minLength: 0, required: false },
    image: Image, // כאן אנחנו שומרים את האובייקט המלא של התמונה עם path ו-alt
    bizNumber: {
        type: Number,
        required: true,
        min: 1000000,
        max: 9999999,
        default: () => Math.floor(1000000 + Math.random() * 9000000), // יצירת bizNumber אוטומטית
    },
    likes: [String],
    comments: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    chat_id: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;
