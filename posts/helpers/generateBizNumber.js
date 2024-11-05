const { createError } = require("../../utils/handleErrors");
const Post = require("../models/mongodb/Post");
const _ = require('lodash');

const isBizNumberExists = async (bizNumber) => {
    try {
        const postWithThisBizNumber = await Post.findOne({ bizNumber });
        return Boolean(postWithThisBizNumber);
    } catch (e) {
        createError('Mongoose', e, 403);
    }
};

const generateBizNumber = async () => {
    let postsCount = await Post.countDocuments();

    if (postsCount === 9_000_000) {
        const e = new Error('an error occurred')
        createError('DB', e, 403, 'You reached to the maximum posts count in your system');
        // throw new Error("You reached to the maximum posts count in your system");
    }
    do {
        random = _.random(1_000_000, 9_999_909);
    } while (await isBizNumberExists(random))
    return random;
};


module.exports = { generateBizNumber, isBizNumberExists }
