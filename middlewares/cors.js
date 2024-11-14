const cors = require("cors");

const corsMiddleware = cors({
    origin: [
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
});

module.exports = corsMiddleware;