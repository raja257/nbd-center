import Joi from "joi";

export const addProposalValidation = data => {
  const schema = Joi.object({
    name: Joi.string().required(),
    phone1: Joi.string().required(),
    phone2: Joi.string(),
    location: Joi.string().required(),
    date: Joi.string().required(),
    deliveryTime: Joi.string().required(),
    description: Joi.string().required(),
  });
  return schema.validate(data);
};
