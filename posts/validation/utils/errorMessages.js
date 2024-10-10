const errorMessages = {
    title: {
        required: 'Title is required',
        min: 'Title must be at least 2 characters long',
        max: 'Title must not exceed 256 characters',
    },
    subtitle: {
        required: 'Subtitle is required',
        min: 'Subtitle must be at least 2 characters long',
        max: 'Subtitle must not exceed 256 characters',
    },
    description: {
        required: 'Description is required',
        min: 'Description must be at least 2 characters long',
        max: 'Description must not exceed 1024 characters',
    },
    phone: {
        required: 'Phone number is required',
        pattern: 'Card "phone" must be a valid phone number',
    },
    email: {
        required: 'Email is required',
        pattern: 'Card "mail" must be a valid mail',
    },
    web: {
        pattern: 'Card "web" must be a valid URL',
    },
    image: {
        url: {
            pattern: 'Card.image "url" must be a valid URL',
        },
        alt: {
            min: 'Alt text must be at least 2 characters long',
            max: 'Alt text must not exceed 256 characters',
        },
    },
    address: {
        country: {
            required: 'Country is required',
        },
        city: {
            required: 'City is required',
        },
        street: {
            required: 'Street is required',
        },
        houseNumber: {
            required: 'House number is required',
        },
    },
};

module.exports = errorMessages;
