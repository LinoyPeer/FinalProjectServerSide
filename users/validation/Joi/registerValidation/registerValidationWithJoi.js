const Joi = require("joi");
const regex = require("./utils/regex");
const errorMessages = require("./utils/errorMessages");

const registerValidationWithJoi = (user) => {
    const schema = Joi.object({
        name: Joi.object()
            .keys({
                first: Joi.string().min(2).max(256).required(),
                middle: Joi.string().min(2).max(256).allow(""),
                last: Joi.string().min(2).max(256).required(),
            })
            .required(),
        phone: Joi.string()
            .regex(regex.phone)
            .rule({ message: errorMessages.phone })
            .required(),
        email: Joi.string()
            .pattern(regex.email)
            .rule({ message: errorMessages.email })
            .required(),
        password: Joi.string()
            .regex(regex.password)
            .rule({ message: errorMessages.password })
            .required(),
        image: Joi.object()
            .keys({
                url: Joi.string()
                    .regex(regex.imageUrl)
                    .rule({ message: errorMessages.imageUrl })
                    .allow(""),
                alt: Joi.string().min(2).max(256).allow(""),
            })
            .required(),
        address: Joi.object()
            .keys({
                state: Joi.string().allow(""),
                country: Joi.string().required(),
                city: Joi.string().required(),
                street: Joi.string().required(),
                houseNumber: Joi.number().required(),
                zip: Joi.number(),
            })
            .required(),
        isBusiness: Joi.boolean().required(),
    });

    return schema.validate(user);
};

module.exports = registerValidationWithJoi;