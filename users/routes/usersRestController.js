const express = require('express');
const { handleError } = require('../../utils/handleErrors');
const { getAllUsers, registerUser, getUserById, loginUser, deleteUser, editUser, changeUserStatus } = require('../models/usersAccessDataService');
const auth = require('../../auth/authService');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newUser = req.body;
        const signin = await registerUser(newUser);
        res.status(201).send(signin);
    } catch (e) {
        handleError(res, e.status || 400, e.message)
    }
});

router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        const token = await loginUser(email, password);
        res.send(token);
    } catch (e) {
        res.status(403).send(e.message);
    }
});


router.get('/', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo || !userInfo.isAdmin) {
            return res.status(403).send('Access denied. Admins only.');
        }
        const allUsers = await getAllUsers();
        if (allUsers.length === 0) {
            return res.status(200).send('There is no users yet');
        }
        res.status(200).send(allUsers);
    } catch (e) {
        handleError(res, e.status || 400, e.message);
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        if (userInfo._id !== id && !userInfo.isAdmin) {
            return handleError(
                res,
                403,
                "Authorization Error: Only the same user or admin can get user info"
            );
        }
        const currentUser = await getUserById(id);
        res.status(201).send(currentUser);
    } catch (e) {
        handleError(res, e.status || 400, e.message);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;

        if (!userInfo.isAdmin) {
            return handleError(
                res,
                403,
                "Authorization Error: Only admin can delete users."
            );
        }
        const currentUserToDelete = await deleteUser(id);
        res.status(200).send(currentUserToDelete);
    } catch (e) {
        handleError(res, e.status || 400, e.message);
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        const editedUser = req.body;
        if (userInfo._id !== id && !userInfo.isAdmin) {
            return res.status(403).send('You do not have permission to edit this user.');
        }
        const userToUpdate = await editUser(id, editedUser);
        res.send(userToUpdate);
    } catch (e) {
        handleError(res, e.status || 400, e.message);
    }
});

router.patch('/:id/status', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { isBusiness } = req.body;
        const updatedUser = await changeUserStatus(id, { isBusiness });
        res.status(200).send(updatedUser);
    } catch (e) {
        handleError(res, e.status || 400, e.message);
    }
});




module.exports = router;