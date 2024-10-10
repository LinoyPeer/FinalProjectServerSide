const Joi = require("joi");
const { phoneRegex, urlRegex, emailRegex } = require("../utils/regex");
const errorMessages = require("../utils/errorMessages");

const validatePostWithJoi = (card) => {
    const schema = Joi.object({
        title: Joi.string().min(2).max(256).required().messages({
            'any.required': errorMessages.title.required,
            'string.min': errorMessages.title.min,
            'string.max': errorMessages.title.max,
        }),
        subtitle: Joi.string().min(2).max(256).required().messages({
            'any.required': errorMessages.subtitle.required,
            'string.min': errorMessages.subtitle.min,
            'string.max': errorMessages.subtitle.max,
        }),
        description: Joi.string().min(2).max(1024).required().messages({
            'any.required': errorMessages.description.required,
            'string.min': errorMessages.description.min,
            'string.max': errorMessages.description.max,
        }),
        phone: Joi.string()
            .pattern(phoneRegex)
            .required().messages({
                'any.required': errorMessages.phone.required,
                'string.pattern.base': errorMessages.phone.pattern,
            }),
        email: Joi.string()
            .pattern(emailRegex)
            .required().messages({
                'any.required': errorMessages.email.required,
                'string.pattern.base': errorMessages.email.pattern,
            }),
        web: Joi.string()
            .pattern(urlRegex)
            .allow("").messages({
                'string.pattern.base': errorMessages.web.pattern,
            }),
        image: Joi.object().keys({
            url: Joi.string()
                .pattern(urlRegex)
                .allow("").messages({
                    'string.pattern.base': errorMessages.image.url.pattern,
                }),
            alt: Joi.string().min(2).max(256).allow("").messages({
                'string.min': errorMessages.image.alt.min,
                'string.max': errorMessages.image.alt.max,
            }),
        }).required(),
        address: Joi.object().keys({
            state: Joi.string().allow(""),
            country: Joi.string().required().messages({
                'any.required': errorMessages.address.country.required,
            }),
            city: Joi.string().required().messages({
                'any.required': errorMessages.address.city.required,
            }),
            street: Joi.string().required().messages({
                'any.required': errorMessages.address.street.required,
            }),
            houseNumber: Joi.number().required().messages({
                'any.required': errorMessages.address.houseNumber.required,
            }),
            zipCode: Joi.number(),
        }).required(),
    });

    return schema.validate(card);
};

module.exports = validatePostWithJoi;
