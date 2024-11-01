const express = require("express");
const { handleError } = require("../../utils/handleErrors");
const { createPost, getAllPosts, getPostById, updatePost, likePost, getMyPosts, deletepost } = require("../models/postsAccessDataService");
const auth = require("../../auth/authService");
const { normalizePost } = require("../helpers/normalizePost");
const validatePost = require("../validation/postValidationService");

const router = express.Router();

router.post('/', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isBusiness) {
            return res.status(403).send('only business user can create a post')
        }
        const validatedPost = validatePost(req.body);
        if (typeof validatedPost === "string") {
            return handleError(res, 400, 'validation error: ' + validatedPost);
        }
        let newPost = await normalizePost(validatedPost, userInfo._id);
        newPost = await createPost(newPost);
        res.status(201).send(newPost);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const allPosts = await getAllPosts();
        if (allPosts.length === 0) {
            return res.status(200).send('There is no posts yet');
        }
        res.status(200).send(allPosts);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});


router.get("/my-posts", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isBusiness) {
            return handleError(res, 403, "Only business user can get my post");
        }
        let post = await getMyPosts(userInfo._id);
        res.send(post);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Post ID:", id);

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
        if (userInfo._id !== fullPost.user_id && !userInfo.isAdmin) {
            res.status(403).send('Only Business user can edit there posts')
        }
        const validatedPost = validatePost(req.body);
        if (typeof validatedPost === "string") {
            handleError(res, 400, "validation error: " + validatedPost);
        }
        let post = await normalizePost(validatedPost, userInfo._id)
        post = await updatePost(id, validatedPost);
        res.send(post);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});


router.patch("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        let postWIthLikesChange = await likePost(id, userId);
        res.send(postWIthLikesChange);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});


router.delete("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;
        const fullPostFromDb = await getPostById(id);
        if (
            userInfo._id !== fullPostFromDb.user_id.toString() &&
            !userInfo.isAdmin
        ) {
            return handleError(
                res,
                403,
                "Authorization Error: Only the user who created the business Post or admin can delete this post"
            );
        }
        let post = await deletepost(id);
        res.send(post);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});


module.exports = router;
