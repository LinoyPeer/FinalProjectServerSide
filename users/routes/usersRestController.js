const express = require('express');
const { handleError } = require('../../utils/handleErrors');
const { getAllUsers, registerUser, getUserById, loginUser, deleteUser, editUser, changeUserStatus } = require('../models/usersAccessDataService');
const auth = require('../../auth/authService');
const upload = require('../../middlewares/multer');
const User = require('../models/mongodb/User');

const router = express.Router();
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const newUser = { ...req.body };

        const existingUser = await User.findOne({ email: newUser.email });
        if (existingUser) {
            return res.status(400).send("This email is already registered.");
        }

        if (req.file) {
            newUser.image = {
                path: req.file.path,
                alt: 'Profile Picture'
            };
            newUser.image.path = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        const signin = await registerUser(newUser);
        res.status(201).send(signin);
    } catch (e) {
        console.error("Error during registration:", e);
        res.status(400).send(e.message || "An error occurred");
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


router.get('/', async (req, res) => {
    try {

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
        if (!userInfo) {
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

router.put('/:id', auth, upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        const { firstName, middleName, lastName, bio } = req.body;

        if (userInfo._id !== id && !userInfo.isAdmin) {
            return res.status(403).send('You do not have permission to edit this user.');
        }

        const updatedData = {};

        if (firstName) updatedData.name = { ...updatedData.name, first: firstName };
        if (middleName) updatedData.name = { ...updatedData.name, middle: middleName };
        if (lastName) updatedData.name = { ...updatedData.name, last: lastName };
        if (bio !== undefined) updatedData.bio = bio;

        if (req.file) {
            updatedData.image = {
                path: req.file.path,
                alt: 'Profile Picture'
            };
            console.log(req.protocol, "fefesf");

            updatedData.image.path = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        const updatedUser = await editUser(id, updatedData);

        res.send(updatedUser);
    } catch (e) {
        console.error(e);
        res.status(400).send(e.message);
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