const config = require('config');
const validatePostWithJoi = require("./Joi/validatePostWithJoi");

const validator = config.get('VALIDATOR');

const validatePost = (post) => {
    if (validator === "joi") {
        const { error, value } = validatePostWithJoi(post);
        if (error) return error.details[0].message;
        return value;
    }
};

module.exports = validatePost;
