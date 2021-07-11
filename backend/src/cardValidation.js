import Joi from '@hapi/joi';

const cardValidation = data => {
  const card = Joi.object().keys({
    side1: Joi.string().required(),
    side2: Joi.string().required(),
  });

  const schema = Joi.object({
    cardTitle: Joi.string().min(1).required(),
    description: Joi.string().min(1),
    cards: Joi.array().items(card),
  });
  return schema.validate(data);
};

export default cardValidation;
