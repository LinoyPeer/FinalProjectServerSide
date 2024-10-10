const { generateAuthToken } = require('../../auth/providers/jwt');
const { createError } = require('../../utils/handleErrors');
const { generateUserPassword, comparePasswords } = require('../helpers/bcrypt');
const User = require('./mongodb/User');
const _ = require('lodash');

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (e) {
        createError('Mongoose', e, 403);
    }
}

const registerUser = async (newUser) => {
    try {
        newUser.password = generateUserPassword(newUser.password)
        let user = await User.create(newUser);
        user = _.pick(user, ['name', 'email', '_id'])
        return user;
    } catch (e) {
        createError('Mongoose', e, 403);
    }
}

const loginUser = async (email, password) => {
    try {
        const userFromDb = await User.findOne({ email });
        if (!userFromDb) {
            const e = new Error('an error occurred')
            createError('DB', e, 403, "Invalid email or password");
            // throw new Error("Invalid email or password");
        }
        if (!comparePasswords(password, userFromDb.password)) {
            const e = new Error('an error occurred')
            createError('DB', e, 403, "Invalid email or password");
            // throw new Error("Invalid email or password");
        }
        const token = generateAuthToken(userFromDb);
        return token;
    } catch (error) {
        const e = new Error('an error occurred')
        createError('Mongoose', e, 403);
    }
};

const getUserById = async (id) => {
    try {
        const userById = await User.findById(id);
        return userById;
    } catch (e) {
        createError('Mongoose', e, 403);
    }
}


module.exports = {
    getAllUsers,
    registerUser,
    getUserById,
    loginUser,
};