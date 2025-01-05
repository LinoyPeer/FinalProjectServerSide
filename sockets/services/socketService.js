const chalk = require("chalk");
const Message = require("../../message/models/mongodb/Message");
const ChatRoom = require("../../chatRooms/models/mongodb/ChatRoom");

const handleSocketConnection = async (socket, chatNamespace) => {
    console.log("User connected");

    socket.on("getMessages", async (roomId) => await sendChatHistory(socket, roomId));

    socket.on("sendMessage", (data) => {

        handleSendMessage(socket, data, chatNamespace)
        console.log('Received message:', data)
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
};

const sendChatHistory = async (socket, roomId) => {
    try {
        const messages = await Message.find({ chatRoom: roomId })
            .populate("sender")
            .select("-__v");

        console.log(`Messages for room ${roomId}:`, messages);
        socket.emit("chatHistory", messages);
    } catch (error) {
        console.error(chalk.red("Error fetching chat history: "), error.message);
    }
};
const handleSendMessage = async (socket, data, chatNamespace) => {
    const { roomId, content, sender } = data;

    if (!content || !roomId || !sender) {
        console.error("Missing required fields");
        return;
    }

    try {
        const newMessage = new Message({
            content,
            sender,
            chatRoom: roomId,
        });

        await newMessage.save();

        let room = await ChatRoom.findById(roomId);
        if (!room) {
            room = new ChatRoom({ _id: roomId, users: [sender] });
        }

        room.lastMessage = newMessage._id;
        room.updatedAt = new Date();
        await room.save();

        chatNamespace.to(roomId).emit("chatMessage", {
            ...newMessage.toObject(),
            sender: {
                ...sender,
            }
        });
    } catch (error) {
        console.error("Error saving message:", error.message);
    }
};

const corsSettings = {
    origin: [
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    methods: ["GET", "POST"],
    credentials: true,
};

module.exports = { handleSocketConnection, corsSettings };

