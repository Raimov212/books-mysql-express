import Joi from 'joi'

const booksValidation = data =>{
    const schema = Joi.object({
        title: Joi.string().required(),
        desc: Joi.string().required(),
        cover: Joi.string().required()
    });

    return schema.validate(data);
}

export default booksValidation;