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
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("user", schema);
module.exports = User;