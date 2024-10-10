const SECRET_WORD = 'secret';
const jwt = require('jsonwebtoken');

const generateAuthToken = (user) => {
    const payload = {
        _id: user._id,
        isAdmin: user.isAdmin,
        isBusiness: user.isBusiness,
    };
    const token = jwt.sign(payload, SECRET_WORD);
    return token;
}

const verifyToken = (tokenFromClient) => {
    try {
        const payload = jwt.verify(tokenFromClient, SECRET_WORD);
        return payload;
    } catch (e) {
        return null;
    }
}

module.exports = { generateAuthToken, verifyToken }