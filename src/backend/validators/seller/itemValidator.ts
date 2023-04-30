import Joi from "joi";
import InvariantError from "@/backend/errors/InvariantError";

export const validatePostItemPayload = (payload: any) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    image: Joi.string().required(),
    price: Joi.number().min(1000).required(),
    stock: Joi.number().min(1).required(),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
}