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

const io = socketIo(server, {
    cors: corsSettings,
    pingTimeout: 60000,
    pingInterval: 25000
});
const chatNamespace = io.of("/chat");
console.log("Namespace details:", chatNamespace.name);
console.log("Available namespaces:", io._nsps.keys());
console.log('Socket connection details:', {
    namespaces: Array.from(io._nsps.keys())
});
// chatNamespace.on("connection", (socket) => {
//     console.log("User connected to chat");
//     const { roomId } = socket.handshake.query;
//     console.log("Received roomId:", roomId); // הוסף לוג זה

//     if (roomId) {
//         socket.join(roomId);
//         console.log(`User joined room: ${roomId}`);
//     }

//     handleSocketConnection(socket, chatNamespace);
// });
chatNamespace.on("connection", (socket) => {
    console.log(chalk.green("New connection to chat namespace"));
    console.log(chalk.blue("Socket ID:", socket.id));

    const { roomId } = socket.handshake.query;
    console.log(chalk.yellow("Received roomId:", roomId));

    if (roomId) {
        socket.join(roomId);
        console.log(chalk.green(`User joined room: ${roomId}`));
        console.log(chalk.magenta("Socket rooms:", socket.rooms));
    } else {
        console.error(chalk.red("No roomId provided"));
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
