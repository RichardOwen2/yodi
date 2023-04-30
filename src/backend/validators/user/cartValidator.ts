import Joi from "joi";
import InvariantError from "@/backend/errors/InvariantError";

export const validatePostCartPayload = (payload: any) => {
  const schema = Joi.object({
    itemId: Joi.string().required(),
    amount: Joi.number().min(1).required(),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
}

export const validatePutCartPayload = (payload: any) => {
  const schema = Joi.object({
    itemId: Joi.string().required(),
    amount: Joi.number().required(),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
}

export const validateDeleteCartPayload = (payload: any) => {
  const schema = Joi.object({
    itemId: Joi.string().required(),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
}