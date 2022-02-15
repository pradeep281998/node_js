 const Joi = require('joi');  

const coursemoduleschema= Joi.object().keys({
    
    name: Joi.string().required().max(100).pattern(
        new RegExp("^[A-Z-a-z0-9 ]*$")
    ),
    topic:  Joi.array().items(Joi.object().keys({ 
        name: Joi.string().required().max(100).pattern(
            new RegExp("^[A-Z-a-z0-9 ]*$")
        ),
        description: Joi.string(), 
      })) 
});

    module.exports= coursemoduleschema;