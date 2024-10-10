const express = require("express");
const postsRouterController = require('../posts/routes/postsRestController')
const usersRouterController = require('../users/routes/usersRestController')
const { handleError } = require("../utils/handleErrors");

const router = express.Router();

router.use("/posts", postsRouterController);
router.use("/users", usersRouterController);

router.use((req, res) => {
    return handleError(res, 404, "Path not found");
});

module.exports = router;
