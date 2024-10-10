const Joi = require("joi");
const errorMessages = require("./utils/errorMessages");
const regex = require("./utils/regex");

const loginValidationWithJoi = (user) => {
    const schema = Joi.object({
        email: Joi.string()
            .pattern(regex.email)
            .rule({ message: errorMessages.email })
            .required(),

        password: Joi.string()
            .regex(regex.password)
            .rule({ message: errorMessages.password })
            .required(),
    });

    return schema.validate(user);
};

module.exports = loginValidationWithJoi;