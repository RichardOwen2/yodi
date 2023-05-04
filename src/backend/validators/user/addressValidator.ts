import Joi from "joi";
import InvariantError from "@/backend/errors/InvariantError";

export const validatePostAddressPayload = (payload: any) => {
  const schema = Joi.object({
    label: Joi.string().required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    note: Joi.string(),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
}

export const validatePutAddressPayload = (payload: any) => {
  const schema = Joi.object({
    addressId: Joi.string().required(),
    label: Joi.string().optional(),
    city: Joi.string().optional(),
    address: Joi.string().optional(),
    note: Joi.string().optional()
  }).or('label', 'city', 'address', 'note')
    .options({ abortEarly: false });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
}
export const validateDeleteAddressPayload = (payload: any) => {
  const schema = Joi.object({
    addressId: Joi.string().required(),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
}