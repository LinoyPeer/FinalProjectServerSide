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

const getPostById = async (postId) => {
    if (db === "mongodb") {
        try {
            let postById = await Post.findById(postId);
            return postById;
        } catch (e) {
            createError('Mongoose', e, 403);
        }
    }
};


const getMyPosts = async (userId) => {
    try {
        let posts = await Post.find({ user_id: userId });
        return posts;
    } catch (error) {
        return createError("Mongoose", error);
    }
};

const updatePost = async (postId, editedPost) => {
    if (db === "mongodb") {
        try {
            let post = await Post.findByIdAndUpdate(postId, editedPost, { upsert: true, new: true });
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
                throw new Error('This id is not recognized by any post');
            }
            if (postById.likes.includes(userId)) {
                let newLikesArray = postById.likes.filter((id) => id !== userId);
                postById.likes = newLikesArray;
            } else {
                postById.likes.push(userId);
            }

            await postById.save();
            return postById;
        } catch (e) {

            console.error(e);
            createError('Mongoose', e, 403);
        }
    }
};

const deletepost = async (postId) => {
    try {
        let post = await Post.findByIdAndDelete(postId);
        return post;
    } catch (error) {
        return createError("Mongoose", error);
    }
};



module.exports = {
    createPost,
    getAllPosts,
    getMyPosts,
    getPostById,
    updatePost,
    likePost,
    deletepost,
}