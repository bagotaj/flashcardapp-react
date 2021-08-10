import Joi from '@hapi/joi';

export const userValidation = data => {
  const schema = Joi.object({
    userName: Joi.string().min(1).required(),
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6),
    role: Joi.string().min(1),
  });
  return schema.validate(data);
};
