import Joi from "joi";

export const schema = {
    email : Joi.string().email().required(),
    password : Joi.string()
        .required()
        .min(8)
        .pattern(new RegExp(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)),
    firstName : Joi.string().required().min(2),
    lastName : Joi.string().optional(),
    phone : Joi.string().required().min(9),
    id : Joi.number().required(),
    age : Joi.number().min(1).max(100)
}
    
