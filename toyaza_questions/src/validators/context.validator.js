
const Joi = require('joi');  

const contextschema= Joi.object().keys({
    title:Joi.string().required().max(100),
    description : Joi.string().required().uppercase(),
    tag: Joi.array().items(Joi.object().keys({ 
        name: Joi.string().required().max(15).pattern(
            new RegExp("^[a-z0-9\-]*$")
        )
    }))
});


    module.exports= contextschema;