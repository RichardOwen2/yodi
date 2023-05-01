import Joi from "joi";
import InvariantError from "@/backend/errors/InvariantError";

export const validatePostUpgradePayload = (payload: any) => {
  const schema = Joi.object({
    city: Joi.string().required(),
    address: Joi.string().required(),
    bankName: Joi.string().required(),
    bankNumber: Joi.string().min(8).required(),
    ownerName: Joi.string().required(),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
}