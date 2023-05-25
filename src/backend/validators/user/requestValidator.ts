import Joi from "joi";
import InvariantError from "@/backend/errors/InvariantError";

export const validatePostItemRequestPayload = (payload: any) => {
  const schema = Joi.object({
    itemId: Joi.string().required(),
    image: Joi.array().items(Joi.string()).min(1).required(),
    itemNote: Joi.string().required(),
    variant: Joi.array().items(
      Joi.object({
        id: Joi.string().required(),
        amount: Joi.number().required(),
      }).required(),
    ).min(1).required(),
    shipperId: Joi.string().required(),
    addressId: Joi.string().required(),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
};
