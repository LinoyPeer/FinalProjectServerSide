const express = require("express");
const chalk = require("chalk");
require('dotenv').config();
const router = require("./router/router");
const corsMiddleware = require("./middlewares/cors");
const morganLogger = require("./logger/loggers/morganLogger");
const connectToDb = require("./DB/dbServise");

const app = express();
const PORT = 8181;

app.use(corsMiddleware);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.json());

app.use(morganLogger);

app.use(express.static('./public'))

app.use(router)


app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(chalk.red('internal error of the server'));
});

app.listen(PORT, () => {
    console.log(chalk.yellow(`Listening to port: ${PORT}`));
    connectToDb();
});
