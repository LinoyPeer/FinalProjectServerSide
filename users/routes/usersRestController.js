const express = require('express');
const { handleError } = require('../../utils/handleErrors');
const { getAllUsers, registerUser, getUserById, loginUser } = require('../models/usersAccessDataService');
const auth = require('../../auth/authService');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const allUsers = await getAllUsers();
        if (allUsers.length === 0) {
            console.log('There is no users yet');
            return res.status(200).send('There is no users yet');
        }
        res.status(200).send(allUsers);
    } catch (e) {
        handleError(res, e.status || 400, e.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const newUser = req.body;
        const signin = await registerUser(newUser);
        res.status(201).send(signin);
    } catch (e) {
        handleError(res, e.status || 400, e.message)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body);
        const currentUser = await getUserById(id);
        res.status(201).send(currentUser);
    } catch (e) {
        handleError(res, e.status || 400, e.message)
    }
});

router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        const token = await loginUser(email, password);
        res.send(token)
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;