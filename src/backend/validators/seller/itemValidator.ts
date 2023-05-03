import Joi from "joi";
import InvariantError from "@/backend/errors/InvariantError";

export const validatePostItemPayload = (payload: any) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    images: Joi.array().items(Joi.string()).min(1).required(),
    itemVariant: Joi.array().items(
      Joi.object({
        label: Joi.string().required(),
        price: Joi.number().min(1000).required(),
        stock: Joi.number().required(),
      }).required(),
    ),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
}