// const express = require('express');
// const { createChatRoom, getMessagesFromChatRoom } = require('../services/roomsService');
// const router = express.Router();

// router.post('/chat-room', async (req, res) => {
//     const { roomId } = req.body;
//     try {
//         const newRoom = await createChatRoom(roomId);
//         res.status(201).json(newRoom);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// router.get('/chat-room/:roomId/messages', async (req, res) => {
//     const { roomId } = req.params;
//     try {
//         const messages = await getMessagesFromChatRoom(roomId);
//         res.json(messages);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// module.exports = router;
