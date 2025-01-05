const mongoose = require('mongoose');
const Image = require('../../../helpers/mongodb/Image');
const { DEFAULT_VALIDATION } = require('../../../helpers/mongodb/mongooseValidation.js');
const _ = require('lodash');
const { getAllUsers } = require('../../../users/models/usersAccessDataService.js');

const postSchema = new mongoose.Schema({
    title: { ...DEFAULT_VALIDATION, required: false },
    postStatus: { ...DEFAULT_VALIDATION, maxLength: 1024, minLength: 0, required: false },
    image: Image,
    bizNumber: {
        type: Number,
        required: true,
        min: 1000000,
        max: 9999999,
        default: () => Math.floor(1000000 + Math.random() * 9000000),
    },
    likes: [String],
    comments: [{
        userName: {
            first: { type: String, required: false },
            middle: { type: String, required: false },
            last: { type: String, required: false }
        },
        userId: { type: mongoose.Schema.Types.ObjectId, required: false, auto: true },
        userImage: { type: String },
        comment: { type: String, required: false },
        commentId: { type: mongoose.Schema.Types.ObjectId, required: false, auto: true },
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    chat_id: { type: mongoose.Schema.Types.ObjectId, required: true },
});

postSchema.pre('save', async function (next) {
    try {
        const user = await mongoose.model('User').findById(this.user_id);
        if (user) {
            const userName = _.pick(user.name, ['first', 'middle', 'last']);
            this.title = `${userName.first} ${userName.middle ? userName.middle + ' ' : ''}${userName.last}`;
        } else {
            this.title = 'UNKNOWN';
        }
        next();
    } catch (err) {
        next(err);
    }
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;
