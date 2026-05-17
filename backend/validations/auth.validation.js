const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(20).allow('', null),
  password: Joi.string().min(6).max(100).required().messages({
    'string.min': 'Mat khau chi can toi thieu 6 ky tu (so hoac chu bat ky).',
    'string.max': 'Mat khau toi da 100 ky tu.'
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Mat khau xac nhan khong khop.'
  })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = {
  registerSchema,
  loginSchema
};
