const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
    },
    sender: {
        first: {
            type: String,
            required: true,
        },
        last: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
});

const Chat = mongoose.model("chat", chatSchema);
module.exports = Chat;
