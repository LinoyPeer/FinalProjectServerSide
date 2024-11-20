const express = require("express");
const chalk = require("chalk");
require("dotenv").config();
const corsMiddleware = require("./middlewares/cors");
const morganLogger = require("./logger/loggers/morganLogger");
const connectToDb = require("./DB/dbServise");
const router = require("./router/router");
const socketIo = require("socket.io");
const { handleSocketConnection, corsSettings } = require("./sockets/services/socketService");

const app = express();
const PORT = 8181;

const server = app.listen(PORT, () => {
    console.log(chalk.yellow(`Listening to port: ${PORT}`));
    connectToDb();
});


const io = socketIo(server, { cors: corsSettings });
const chatNamespace = io.of("/chat");

chatNamespace.on("connection", (socket) => {
    console.log("User connected to chat");
    const { roomId } = socket.handshake.query;
    console.log(roomId);

    if (roomId) {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    }

    handleSocketConnection(socket, chatNamespace);
});


app.use(corsMiddleware);
app.use(express.json());
app.use(morganLogger);
app.use(router);
app.use(express.static("./public"));

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(chalk.red("Internal error of the server"));
});


// ###################################################



// const express = require("express");
// const chalk = require("chalk");
// require('dotenv').config();
// const corsMiddleware = require("./middlewares/cors");
// const morganLogger = require("./logger/loggers/morganLogger");
// const connectToDb = require("./DB/dbServise");
// const router = require("./router/router");
// const socketIo = require("socket.io");

// const app = express();
// const PORT = 8181;

// const server = app.listen(PORT, () => {
//     console.log(chalk.yellow(`Listening to port: ${PORT}`));
//     connectToDb();
// });

// const corsSettings = {
//     origin: [
//         "http://127.0.0.1:5500",
//         "http://localhost:5500",
//         "http://127.0.0.1:5173",
//         "http://localhost:5173",
//         "http://localhost:5174",
//         "http://127.0.0.1:5174",
//     ],
//     credentials: true
// };

// const io = socketIo(server, { cors: corsSettings });
// const chatNamespace = io.of('/chat');

// const chatHistory = [];

// chatNamespace.on('connection', (socket) => {
//     console.log('user connected');

//     socket.emit('chatHistory', chatHistory);

//     socket.on('sendMessage', (data) => {
//         console.log(data);
//         chatHistory.push(data);
//         chatNamespace.emit('chatMessage', data);
//     });

//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });

// app.use(corsMiddleware);
// app.use(express.json());
// app.use(morganLogger);
// app.use(router);
// app.use(express.static('./public'));

// app.use((err, req, res, next) => {
//     console.log(err);
//     res.status(500).send(chalk.red('Internal error of the server'));
// });