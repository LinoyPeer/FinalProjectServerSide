const config = require('config');
const { createError } = require("../../utils/handleErrors");
const Post = require("./mongodb/Post");
const { default: mongoose } = require('mongoose');

const db = config.get('DB');

if (!db || db !== "mongodb") {
    throw new Error("Invalid or unsupported database configuration in config file.");
}

const createPost = async (newPost) => {
    if (db === "mongodb") {
        try {
            let post = new Post(newPost);
            post = await post.save();
            return post;
        } catch (e) {
            createError('Mongoose', e, 403);
        }
    }
};

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
    if (db === "mongodb") {
        try {
            let posts = await Post.find({ user_id: userId });
            return posts;
        } catch (error) {
            createError("Mongoose", error);
        }
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
            let post = await Post.findById(postId);
            if (!post) {
                throw new Error("A post with this ID cannot be found in the database");
            }
            if (post.likes.includes(userId)) {
                post.likes = post.likes.filter((id) => id != userId);
            } else {
                post.likes.push(userId);
            }
            await post.save();
            return post;
        } catch (error) {
            createError("Mongoose", error);
        }
    }
};

const updatePostBizNumber = async (id, newBizNumber) => {
    if (db === "mongodb") {
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
    }
};

const deletepost = async (postId) => {
    if (db === "mongodb") {
        try {
            let post = await Post.findByIdAndDelete(postId);
            return post;
        } catch (error) {
            createError("Mongoose", error);
        }
    }
};

const createComment = async (postId, comment, req) => {
    if (db === "mongodb") {
        console.log('postId: ', postId);
        console.log('comment: ', comment);
        try {
            const userInfo = req.user;
            if (!userInfo || !userInfo._id) {
                throw new Error("User information not found");
            }

            // שליפת פרטי המשתמש ממסד הנתונים
            const user = await mongoose.model('User').findById(userInfo._id);
            if (!user) {
                throw new Error("User not found in the database");
            }

            // יצירת האובייקט של התגובה
            const firstName = user.name && user.name.first ? user.name.first : 'Unknown';
            const middleName = user.name && user.name.middle ? user.name.middle : '';
            const lastName = user.name && user.name.last ? user.name.last : 'Unknown';
            const userImage = user.image ? user.image.path : 'Image Profile';

            const commentObj = {
                userName: {
                    first: firstName,
                    middle: middleName,
                    last: lastName,
                },
                userId: userInfo._id,
                userImage: userImage,
                comment: comment || 'No comment provided',
                commentId: new mongoose.Types.ObjectId(),
                createdAt: new Date(),
            };

            console.log('commentObj: ', commentObj);

            // חיפוש הפוסט לפי ה-ID
            let post = await Post.findById(postId);
            if (!post) {
                throw new Error("A post with this ID cannot be found in the database");
            }

            // הוספת התגובה לפוסט
            post.comments.push(commentObj);
            await post.save();

            return post;
        } catch (e) {
            console.error("Error creating comment:", e);
            throw new Error(`Mongoose says: ${e.message || "An unknown error occurred"}`);
        }
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
};
