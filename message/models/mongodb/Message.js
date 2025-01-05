
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    chatRoom: { type: mongoose.Schema.Types.ObjectId, ref: "ChatRoom" },
    content: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
