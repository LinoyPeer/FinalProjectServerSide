const config = require('config');
const { createError } = require("../utils/handleErrors");
const { verifyToken } = require("./providers/jwt");

const tokenGenerator = config.get('TOKEN_GENERATOR');

const auth = (req, res, next) => {
    if (tokenGenerator === "jwt") {
        try {
            const tokenFromClient = req.header("x-auth-token");
            const tokenFromClientFormData = req.body["x-auth-token"];

            if (!tokenFromClient && !tokenFromClientFormData) {
                const e = new Error('An error occurred');
                createError('Jwt', e, 403, 'Please Login');
                return res.status(403).send("Please Login");
            }

            let userInfo;
            if (tokenFromClient) {
                userInfo = verifyToken(tokenFromClient);
            }

            if (!userInfo && tokenFromClientFormData) {
                userInfo = verifyToken(tokenFromClientFormData);
            }

            if (!userInfo) {
                const e = new Error('Unauthorized user');
                createError('Jwt', e, 403, 'Unauthorized user');
                return res.status(403).send("Unauthorized user");
            }

            req.user = userInfo;
            return next();
        } catch (error) {
            return res.status(500).send(error.message);
        }
    } else {
        return res.status(500).send('Token generator not configured correctly');
    }
};

module.exports = auth;

