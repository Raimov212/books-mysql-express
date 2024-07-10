import Joi from "joi"

export const validationUser = (data)=>{

    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')).required(),
        role: Joi.string().valid('admin', 'user').required()
    });

    return schema.validate(data);
}

export const validationSignInUser = (data) => {

    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')).required()
    });

    return schema.validate(data);
}
