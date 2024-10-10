const mongoose = require('mongoose');
const Image = require('../../../helpers/mongodb/Image');
const Address = require('../../../helpers/mongodb/Address');
const { PHONE, EMAIL, URL, DEFAULT_VALIDATION } = require('../../../helpers/mongodb/mongooseValidation.js');

const postSchema = new mongoose.Schema({
    title: DEFAULT_VALIDATION,
    subtitle: DEFAULT_VALIDATION,
    description: { ...DEFAULT_VALIDATION, maxLength: 1024 },
    phone: PHONE,
    email: EMAIL,
    web: URL,
    image: Image,
    address: Address,
    bizNumber: {
        type: Number,
        required: true,
        min: 1000000,
        max: 9999999,
    },
    likes: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});


const Post = mongoose.model("post", postSchema);
module.exports = Post;
