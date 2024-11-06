const config = require('config');
const { createError } = require("../../utils/handleErrors");
const Post = require("./mongodb/Post");
const { jwtDecode } = require('jwt-decode');

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
    try {
        let post = await Post.findById(postId);
        if (!post) {
            const error = new Error(
                "A post with this ID cannot be found in the database"
            );
            return createError("Mongoose", error);
        }
        if (post.likes.includes(userId)) {
            let newLikesArray = post.likes.filter((id) => id != userId);
            post.likes = newLikesArray;
        } else {
            post.likes.push(userId);
        }
        await post.save();
        return post;
    } catch (error) {
        return createError("Mongoose", error);
    }
};

const updatePostBizNumber = async (id, newBizNumber) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { bizNumber: newBizNumber },
            { new: true }
        );
        return updatedPost;
    } catch (error) {
        createError('Mongoose', error, 400);
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

const createComment = async (postId, comment) => {
    try {
        let post = await Post.findById(postId);
        if (!post) {
            throw new Error("A post with this ID cannot be found in the database");
        }
        post.comments.push(comment);
        await post.save();
        return post;
    } catch (e) {
        return createError("Mongoose", e.message || "An unknown error occurred", 400);
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
    updatePostBizNumber,
    createComment,
}