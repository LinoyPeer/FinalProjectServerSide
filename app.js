const express = require("express");
const chalk = require("chalk");
require("dotenv").config();
const morganLogger = require("./logger/loggers/morganLogger");
const connectToDb = require("./DB/dbServise");
const router = require("./router/router");
const socketIo = require("socket.io");
const { handleSocketConnection, corsSettings } = require("./sockets/services/socketService");
const cors = require("cors");

const app = express();
const PORT = 8181;
const path = require("path");

app.use(cors())

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

chatNamespace.on("connection", (socket) => {
    console.log(chalk.green("New connection to chat namespace"));

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

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganLogger);
app.use(router);


app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(chalk.red("Internal error of the server"));
});
