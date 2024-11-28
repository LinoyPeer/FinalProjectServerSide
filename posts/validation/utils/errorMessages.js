const errorMessages = {
    title: {
        required: 'Title is required',
        min: 'Title must be at least 2 characters long',
        max: 'Title must not exceed 256 characters',
    },
    postStatus: {
        min: 'Post status must be at least 0 characters long',
        max: 'Post status must not exceed 1024 characters',
    },
    image: {
        path: 'Image is required and must have a valid path.',
        alt: {
            min: 'Alt text must be at least 2 characters long.',
            max: 'Alt text must not exceed 256 characters.',
        },
    },
    bizNumber: {
        required: 'Business number is required.',
        min: 'Business number must be between 1000000 and 9999999.',
        max: 'Business number must be between 1000000 and 9999999.',
    },
    likes: {
        array: 'Likes must be an array of user IDs.',
    },
    comments: {
        array: 'Comments must be an array of user comments.',
    },
    user_id: {
        required: 'User ID is required.',
    },
    chat_id: {
        required: 'Chat ID is required.',
        invalid: 'Chat ID must be a valid ObjectId.',
    },
};

module.exports = errorMessages;
