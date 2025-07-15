import Joi from "joi";

export const postSchema = Joi.object({
  title: Joi.string().min(2).required(),
  description: Joi.string().min(2).required(),
});
