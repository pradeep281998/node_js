const Joi = require('joi');  

const questionschema= Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required().uppercase(),
    difficulty: Joi.number().required().min(0).max(10),
    option: Joi.array(),
    context : Joi.string().required(),
    module : Joi.string().required(),
    topic : Joi.string().required()
});

    module.exports= questionschema;