const cors = require("cors");

const corsMiddleware = cors({
    origin: "https://finalprojectclientside.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: "*",
    credentials: true,
});

module.exports = corsMiddleware;