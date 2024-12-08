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
        newUser.password = generateUserPassword(newUser.password);
        let user = await User.create(newUser);
        return user;
    } catch (e) {
        console.error("Error registering user:", e);
        throw new Error('Error during registration');
    }
};



const loginUser = async (email, password) => {
    try {
        const userFromDb = await User.findOne({ email });
        if (!userFromDb) {
            throw new Error("Invalid email or password");
        }
        if (userFromDb.lockUntil && userFromDb.lockUntil > Date.now()) {
            throw new Error("Account is temporarily locked. Try again later.");
        }
        if (!comparePasswords(password, userFromDb.password)) {
            userFromDb.failedLoginAttempts += 1;
            if (userFromDb.failedLoginAttempts >= 3) {
                userFromDb.lockUntil = Date.now() + 24 * 60 * 60 * 1000;
                userFromDb.failedLoginAttempts = 0;
            }

            await userFromDb.save();
            throw new Error("Invalid email or password");
        }
        userFromDb.failedLoginAttempts = 0;
        userFromDb.lockUntil = null;
        await userFromDb.save();

        const token = generateAuthToken(userFromDb);
        return token;
    } catch (error) {
        createError('DB', error, 403, error.message);
    }
};

// const getUserById = async (id) => {
//     try {
//         let userById = await User.findById(id);
//         userById = _.pick(userById, ['_id', 'name', 'email', 'phone', 'image', 'address', 'isAdmin', 'isBusiness', 'createdAt']
//         )
//         return userById;
//     } catch (e) {
//         createError('Mongoose', e, 403);
//     }
// }
const getUserById = async (id) => {
    try {
        const userById = await User.findById(id);
        return userById;
    } catch (e) {
        createError('Mongoose', e, 403);
    }
};

const deleteUser = async (id) => {
    try {
        const userToDelete = await User.findByIdAndDelete(id)
        return userToDelete;
    } catch (e) {
        createError('Mongoose', e, 403);
    }
}

const editUser = async (userId, editedUser) => {
    try {
        let postToEdit = await User.findByIdAndUpdate(userId, editedUser, { upsert: true, new: true });
        return postToEdit;
    } catch (e) {
        createError('Mongoose', e, 403);
    }
}

const changeUserStatus = async (id, statusUpdates) => {
    try {
        const user = await User.findByIdAndUpdate(id, statusUpdates, { new: true });
        return user;
    } catch (e) {
        createError('Mongoose', e, 403);
    }
};


module.exports = {
    getAllUsers,
    registerUser,
    getUserById,
    loginUser,
    deleteUser,
    editUser,
    changeUserStatus,
};