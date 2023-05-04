import Joi from "joi";
import InvariantError from "@/backend/errors/InvariantError";

export const validatePostShipperPayload = (payload: any) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(1000).required(),
    city: Joi.string().required(),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
}

export const validatePutShipperPayload = (payload: any) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().min(1000).required(),
    city: Joi.string().required(),
  }).or('name', 'price', 'city')
    .options({ abortEarly: false });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
}

export const validateDeleteShipperPayload = (payload: any) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
}