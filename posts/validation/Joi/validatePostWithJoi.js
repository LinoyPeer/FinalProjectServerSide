const Joi = require("joi");
const { urlRegex } = require("../utils/regex");
const errorMessages = require("../utils/errorMessages");

const validatePostWithJoi = (post) => {
    const schema = Joi.object({
        title: Joi.string().min(2).max(256).required().messages({
            'any.required': errorMessages.title.required,
            'string.min': errorMessages.title.min,
            'string.max': errorMessages.title.max,
        }),
        postStatus: Joi.string().min(0).max(1024).allow('').optional().messages({
            'string.min': errorMessages.postStatus.min,
            'string.max': errorMessages.postStatus.max,
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
        likes: Joi.array().items(Joi.string()),
        comments: Joi.array().items(Joi.string().min(2).max(256)).optional(),
        user_id: Joi.string()
    });

    return schema.validate(post);
};

module.exports = validatePostWithJoi;
