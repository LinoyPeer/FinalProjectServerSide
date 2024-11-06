const mongoose = require('mongoose');

const connectToLocalDb = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/finalProjectCollection");
        console.log("Connected to MongoDB locally");
    } catch (e) {
        console.error("Could not connect to MongoDB", e);
        throw new Error("Could not connect to MongoDB", e);

    }
};

module.exports = connectToLocalDb;