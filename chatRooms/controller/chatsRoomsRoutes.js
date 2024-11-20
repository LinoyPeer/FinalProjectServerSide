const express = require('express');
const { createChatRoom, getMessagesFromChatRoom } = require('../services/roomsService');
const router = express.Router();


// יצירת חדר חדש
router.post('/chat-room', async (req, res) => {
    const { roomId } = req.body;  // מקבל את ה-roomId מהגוף של הבקשה

    try {
        const newRoom = await createChatRoom(roomId);  // קריאה לפונקציה שייצרת חדר חדש
        res.status(201).json(newRoom);  // מחזיר את החדר שנוצר כתגובה
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// קבלת הודעות מחדר צ'אט
router.get('/chat-room/:roomId/messages', async (req, res) => {
    const { roomId } = req.params;
    try {
        const messages = await getMessagesFromChatRoom(roomId);
        res.json(messages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
