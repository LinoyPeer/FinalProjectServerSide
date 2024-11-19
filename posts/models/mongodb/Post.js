const mongoose = require('mongoose');
const Image = require('../../../helpers/mongodb/Image');
const Address = require('../../../helpers/mongodb/Address');
const { DEFAULT_VALIDATION } = require('../../../helpers/mongodb/mongooseValidation.js');

const postSchema = new mongoose.Schema({
    title: DEFAULT_VALIDATION,
    postStatus: { ...DEFAULT_VALIDATION, maxLength: 1024, minLength: 0, required: false },
    image: Image,
    bizNumber: {
        type: Number,
        required: true,
        min: 1000000,
        max: 9999999,
    },
    likes: [String],
    comments: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    chat_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});


const Post = mongoose.model("post", postSchema);
module.exports = Post;