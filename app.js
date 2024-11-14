// const express = require("express");
// const chalk = require("chalk");
// require('dotenv').config();
// const router = require("./router/router");
// const corsMiddleware = require("./middlewares/cors");
// const morganLogger = require("./logger/loggers/morganLogger");
// const connectToDb = require("./DB/dbServise");

// const app = express();
// const PORT = 8181;

// app.use(corsMiddleware);

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

// app.use(express.json());

// app.use(morganLogger);

// app.use(express.static('./public'))

// app.use(router)


// app.use((err, req, res, next) => {
//     console.log(err);
//     res.status(500).send(chalk.red('internal error of the server'));
// });

// app.listen(PORT, () => {
//     console.log(chalk.yellow(`Listening to port: ${PORT}`));
//     connectToDb();
// });


const express = require("express");
const chalk = require("chalk");
require('dotenv').config();
const corsMiddleware = require("./middlewares/cors");
const morganLogger = require("./logger/loggers/morganLogger");
const connectToDb = require("./DB/dbServise");
const socketIo = require("socket.io");
const router = require("./router/router");

const app = express();
const PORT = 8181;

const server = app.listen(PORT, () => {
    console.log(chalk.yellow(`Listening to port: ${PORT}`));
    connectToDb();
});
const io = socketIo(server, {
    cors: {
        origin: [
            "http://127.0.0.1:5500",
            "http://localhost:5500",
            "http://127.0.0.1:5173",
            "http://localhost:5173",
            "http://localhost:5174",
            "http://127.0.0.1:5174",
        ],
    },
});

const chatHistory = [];

io.on("connection", (stream) => {
    console.log("user connected");

    stream.emit("recoverHistory", chatHistory);

    stream.on("message sent", (message) => {
        chatHistory.push(message);
        io.emit("message received", message);
    });

    stream.on("disconnect", () => {
        console.log("user disconnected");
    });

});

app.use(corsMiddleware);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.json());

app.use(morganLogger);

app.use(router);

app.use(express.static('./public'));

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(chalk.red('Internal error of the server'));
});

