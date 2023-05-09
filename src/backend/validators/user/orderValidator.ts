import Joi from "joi";
import InvariantError from "@/backend/errors/InvariantError";

export const validatePostOrderPayload = (payload: any) => {
  const schema = Joi.object({
    itemId: Joi.string().required(),
    itemVariant: Joi.array().items(
      Joi.object({
        id: Joi.string().required(),
        amount: Joi.number().required(),
      }).required(),
    ).min(1).required(),
    itemNote: Joi.string().required(),
    addressId: Joi.string().required(),
    shipperId: Joi.string().required(),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
}