const chalk = require("chalk");
const Chat = require("../../chats/models/mongodb/Chat");

function handleSocketConnection(socket, chatNamespace) {
    console.log('User connected');

    getChatHistory(socket);

    socket.on('sendMessage', (data) => handleSendMessage(socket, data, chatNamespace));

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
}

async function getChatHistory(socket) {
    try {
        const chatHistory = await Chat.find().select('-__v');
        socket.emit('chatHistory', chatHistory);
    } catch (error) {
        console.error(chalk.red("Error fetching chat history: "), error.message);
    }
}

async function handleSendMessage(socket, data, chatNamespace) {
    console.log("Message received: ", data);

    if (!data.content || !data.timestamp || !data.sender || !data.sender._id) {
        console.log(chalk.red('Missing required data fields.'));
        return;
    }

    const newMessage = new Chat({
        content: data.content,
        timestamp: data.timestamp,
        sender: data.sender,
    });

    try {
        await newMessage.save();
        console.log(chalk.green("Message saved to DB"));
        chatNamespace.emit('chatMessage', data);
    } catch (error) {
        console.error(chalk.red("Error saving message to DB: "), error.message);
    }
}

module.exports = { handleSocketConnection };
