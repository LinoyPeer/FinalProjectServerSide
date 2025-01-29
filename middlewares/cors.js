const cors = require("cors");

const corsMiddleware = cors({
    origin: [
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:8181",
        "https://finalprojectclientside.onrender.com1",
    ],
});

module.exports = corsMiddleware;