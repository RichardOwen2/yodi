import Joi from "joi";
import InvariantError from "@/backend/errors/InvariantError";

export const validatePostItemPayload = (payload: any) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    image: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
}