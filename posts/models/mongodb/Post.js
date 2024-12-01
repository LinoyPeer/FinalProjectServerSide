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
    comments: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    chat_id: { type: mongoose.Schema.Types.ObjectId, required: true },
});
postSchema.pre('save', async function (next) {
    try {
        console.log('this.user_id: ', this.user_id);
        const user = await mongoose.model('User').findById(this.user_id);
        console.log('user: ', user);
        if (user) {
            const userName = _.pick(user.name, ['first', 'middle', 'last']);
            console.log('userName: ', userName);
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
