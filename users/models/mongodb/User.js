const mongoose = require("mongoose");
const Name = require("../../../helpers/mongodb/Name");
const Image = require("../../../helpers/mongodb/Image");
const Address = require("../../../helpers/mongodb/Address");
const { PHONE, EMAIL } = require("../../../helpers/mongodb/mongooseValidation");

const schema = new mongoose.Schema({
    name: Name,
    phone: PHONE,
    email: EMAIL,
    password: {
        type: String,
        required: true,
        trim: true,
    },
    image: Image,
    address: Address,
    isAdmin: { type: Boolean, default: false },
    isBusiness: { type: Boolean, default: false },
    bio: { type: String, required: false, default: 'Welcome to my InstaPost profile page' },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    failedLoginAttempts: {
        type: Number,
        default: 0,
    },
    lockUntil: {
        type: Date,
        default: null,
    },
});

const User = mongoose.model("User", schema);
module.exports = User;
