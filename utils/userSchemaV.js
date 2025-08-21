const Joi = require('joi');



const userSchemaValidation = Joi.object({
    signup : Joi.object({
        fullname : Joi.string().required().min(5).max(30),
        username : Joi.string().required().min(5).max(20),
        email : Joi.string().required().min(12).max(50).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password : Joi.string().required().min(5).max(16)
    })
});



module.exports = userSchemaValidation;