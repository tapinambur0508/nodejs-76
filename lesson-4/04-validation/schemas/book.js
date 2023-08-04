const Joi = require("joi");

const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  pages: Joi.number().required(),
});

module.exports = bookSchema;
