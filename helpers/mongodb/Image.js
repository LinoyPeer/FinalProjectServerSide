const mongoose = require("mongoose");
const { URL, DEFAULT_VALIDATION } = require("./mongooseValidation");


const Image = new mongoose.Schema({
    path: { type: String, required: true },
    alt: DEFAULT_VALIDATION,
});

module.exports = Image;
