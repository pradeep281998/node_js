
const Joi = require('joi');  

const courseschema= Joi.object().keys({
    code:Joi.string().required().max(6).min(3).pattern(
        new RegExp("^[A-Z0-9]*$")
    ),
    name:Joi.string().required().max(100).pattern(
        new RegExp("^[A-Za-z0-9 ]*$")
    ),
    description : Joi.string().required().uppercase()
});


    module.exports= courseschema;