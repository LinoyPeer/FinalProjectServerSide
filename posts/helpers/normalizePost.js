const { generateBizNumber } = require("./generateBizNumber");

const normalizePost = async (rawPost, userId) => {
    return {
        ...rawPost,
        image: {
            url: rawPost.image.url || "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
            alt: rawPost.image.alt || 'Business Post Image'
        },
        bizNumber: rawPost.bizNumber || await generateBizNumber(),
        user_id: rawPost.user_id || userId,
    };
};

module.exports = { normalizePost };