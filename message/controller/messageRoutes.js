const express = require('express');
const { sendMessageToChatRoom } = require('./path/to/your/sendMessageToChatRoom');
const router = express.Router();

router.post('/sendMessage', async (req, res) => {
    try {
        const { roomId, senderId, content } = req.body;
        const newMessage = await sendMessageToChatRoom(roomId, senderId, content);

        res.status(200).json({
            message: "Message sent successfully",
            data: newMessage,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
