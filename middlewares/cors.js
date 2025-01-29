const cors = require("cors");

const corsMiddleware = cors({
    origin: "*",
    // methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    // allowedHeaders: "*",
});

module.exports = corsMiddleware;