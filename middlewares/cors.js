const cors = require("cors");

const corsMiddleware = cors({
    origin: "https://finalprojectclientside.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
});

module.exports = corsMiddleware;