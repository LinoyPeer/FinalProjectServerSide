const config = require('config');
const { createError } = require("../../utils/handleErrors");
const Post = require("./mongodb/Post");

const db = config.get('DB');

const createPost = async (newPost) => {
    if (db === "mongodb") {
        try {
            let post = new Post(newPost)
            post = await post.save();
            return post;
        } catch (e) {
            createError('Mongoose', e, 403);
        }
    }
}

const getAllPosts = async () => {
    if (db === "mongodb") {
        try {
            const posts = await Post.find();
            return posts;
        } catch (e) {
            createError('Mongoose', e, 403);
        }
    }
};

const getPostById = async (cardId) => {
    if (db === "mongodb") {
        try {
            let postById = await Post.findById(cardId);
            return postById;
        } catch (e) {
            createError('Mongoose', e, 403);
        }
    }
};

const updatePost = async (cardId, editedPost) => {
    if (db === "mongodb") {
        try {
            let post = await Post.findByIdAndUpdate(cardId, editedPost, { upsert: true, new: true });
            return post;
        } catch (e) {
            createError('Mongoose', e, 403);
        }
    }
};


const likePost = async (postId, userId) => {
    if (db === "mongodb") {
        try {
            const postById = await Post.findById(postId);
            if (!postById) {
                new Error('This id is not recognized by any post')
            }
            if (postById.likes.includes(userId)) {
                let newLikesArray = card.likes.filter((id) => id !== userId);
                card.likes = newLikesArray;

            } else {
                card.likes.push(userId)
            }
        } catch (e) {
            createError('Mongoose', e, 403);
        }
    }
}


module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    likePost,
}