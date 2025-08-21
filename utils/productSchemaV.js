const Joi = require('joi');


const productSchemaValidation = Joi.object({
    products : Joi.object({

        name : Joi.string().required().min(5).max(100),
        price : Joi.string().required(),
        des : Joi.string().required().min(20).max(200)


    }).required()
}).unknown();


module.exports = productSchemaValidation;