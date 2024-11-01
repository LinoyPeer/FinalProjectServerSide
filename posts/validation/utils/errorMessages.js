const errorMessages = {
    title: {
        required: 'Title is required',
        min: 'Title must be at least 2 characters long',
        max: 'Title must not exceed 256 characters',
    },
    postStatus: {
        min: 'postStatus must be at least 0 characters long',
        max: 'postStatus must not exceed 1024 characters',
    },
    image: {
        url: {
            pattern: 'Post.image "url" must be a valid URL',
        },
        alt: {
            min: 'Alt text must be at least 2 characters long',
            max: 'Alt text must not exceed 256 characters',
        },
    },
};

module.exports = errorMessages;
