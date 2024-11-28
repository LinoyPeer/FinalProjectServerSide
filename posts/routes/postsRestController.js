const express = require("express");
const { handleError } = require("../../utils/handleErrors");
const { createPost, getAllPosts, getPostById, updatePost, likePost, getMyPosts, deletepost, updatePostBizNumber, createComment } = require("../models/postsAccessDataService");
const auth = require("../../auth/authService");
const { normalizePost } = require("../helpers/normalizePost");
const validatePost = require("../validation/postValidationService");
const { isBizNumberExists } = require("../helpers/generateBizNumber");
const validatePostWithJoi = require("../validation/Joi/validatePostWithJoi");
const upload = require("../../middlewares/multer");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);

        const user_id = req.user._id;
        console.log('Extracted user_id:', user_id);

        const postData = req.body;

        console.log('Post data:', postData);

        if (!req.file) {
            console.log('No image uploaded');
            return res.status(400).send("Image is required.");
        }
        const chat_id = new mongoose.Types.ObjectId();
        const bizNumber = Math.floor(1000000 + Math.random() * 9000000);
        console.log('Generated chat_id:', chat_id);
        console.log('Generated bizNumber:', bizNumber);

        // const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        console.log("imageUrl: ", imageUrl);

        const validatedPost = {
            postStatus: postData.postStatus || '',
            image: {
                path: imageUrl, // נתיב URL לתמונה
                alt: postData.imageAlt || 'Default Alt Text',
            },
            likes: [],
            comments: [],
            user_id,
            chat_id,
            bizNumber,
        };
        console.log('Post data before validation:', validatedPost);

        const { error } = validatePostWithJoi(validatedPost);
        if (error) {
            console.log('Validation error:', error.details[0].message);
            return res.status(400).send(error.details[0].message);
        }

        const newPost = await createPost(validatedPost);
        console.log('New post created:', newPost);
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send("Server error");
    }
});



router.get("/my-posts", auth, async (req, res) => {
    try {
        const userId = req.user._id;
        const posts = await getMyPosts(userId);

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: 'No posts found' });
        }

        return res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});



router.get("/", async (req, res) => {
    try {
        const posts = await getAllPosts();
        if (!posts) {
            throw new Error('Posts undefined or null');
        }
        if (posts.length === 0) {
            return res.status(200).json({ message: 'No posts found' });
        }
        return res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let currentPost = await getPostById(id);
        res.send(currentPost);
    } catch (error) {
        handleError(res, 404, error.message);
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        const fullPost = await getPostById(id);
        if (userInfo._id !== fullPost.user_id.toString() && !userInfo.isAdmin) {
            return res.status(403).send('Only the post creator or an admin can edit this post');
        }
        const validatedPost = validatePost(req.body);
        if (typeof validatedPost === "string") {
            return handleError(res, 400, "Validation error: " + validatedPost);
        }
        const normalizedPost = await normalizePost(validatedPost, userInfo._id);
        const updatedPost = await updatePost(id, normalizedPost);
        res.send(updatedPost);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});


router.patch("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const newBizNumber = req.body.newBizNumber;
        if (newBizNumber === undefined) {
            let post = await likePost(id, userId);
            return res.send(post);
        }
        const userInfo = req.user;
        if (!userInfo.isAdmin) {
            throw new Error('ONLY ADMIN user can get a new bizNumber');
        }
        const bizNumberExists = await isBizNumberExists(newBizNumber);
        if (bizNumberExists) {
            return res.status(400).json({ message: "Biz number is already in use." });
        }
        const updatedBusiness = await updatePostBizNumber(id, newBizNumber);
        if (!updatedBusiness) {
            return res.status(404).json({ message: "Business not found." });
        }
        res.send(updatedBusiness);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});


router.delete("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;
        const fullPostFromDb = await getPostById(id);
        if (!fullPostFromDb) {
            return handleError(
                res,
                404,
                "Post not found: No post exists with the provided ID"
            );
        }
        if (
            userInfo._id !== fullPostFromDb.user_id.toString() &&
            !userInfo.isAdmin
        ) {
            return handleError(
                res,
                403,
                "Authorization Error: Only the user who created the post or an admin can delete this post"
            );
        }

        const post = await deletepost(id);
        res.send(post);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.post('/:id/comments', auth, async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    const userInfo = req.user;

    try {
        const fullPostFromDb = await getPostById(id);
        if (!fullPostFromDb) {
            return res.status(404).send({
                message: "Post not found: No post exists with the provided ID or it is no longer available"
            });
        }
        if (userInfo.isAdmin || userInfo.isBussines) {
            const result = await createComment(id, comment);
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(400).send({
            message: error.message || "An unknown error occurred"
        });
    }
});




module.exports = router;
