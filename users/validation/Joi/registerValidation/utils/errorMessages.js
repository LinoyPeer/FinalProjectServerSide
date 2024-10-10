const errorMessages = {
    phone: 'user "phone" must be a valid phone number',
    email: 'user "email" must be a valid email address',
    password:
        'user "password" must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-',
    imageUrl: "user image must be a valid URL",
};

module.exports = errorMessages;