const Joi = require('@hapi/joi');

const rankValidation = data => {
  const schema = Joi.object({
    userId: Joi.string().min(1).required(),
    userName: Joi.string().min(1).required(),
    points: Joi.number().min(0),
  });
  return schema.validate(data);
};

module.exports.rankValidation = rankValidation;
