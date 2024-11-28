const Joi = require('joi');
const mongoose = require('mongoose');
const errorMessages = require('../utils/errorMessages');

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
        image: Joi.object({
            path: Joi.string().required().messages({
                'any.required': errorMessages.image.path,
            }),
            alt: Joi.string().min(2).max(256).allow('').optional().messages({
                'string.min': errorMessages.image.alt.min,
                'string.max': errorMessages.image.alt.max,
            }),
        }).required().messages({
            'any.required': errorMessages.image.path,
        }),
        likes: Joi.array().optional().messages({
            'array.base': errorMessages.likes.array,
        }),
        comments: Joi.array().optional().messages({
            'array.base': errorMessages.comments.array,
        }),
        user_id: Joi.string().required().messages({
            'any.required': errorMessages.user_id.required,
        }),
        chat_id: Joi.custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.error('any.invalid', { message: errorMessages.chat_id.invalid });
            }
            return value;
        }).required().messages({
            'any.required': errorMessages.chat_id.required,
        }),
        bizNumber: Joi.number().required().messages({
            'any.required': errorMessages.bizNumber.required,
            'number.base': 'Business number must be a number.',
        }),
    });

    return schema.validate(post);
};

module.exports = validatePostWithJoi;
