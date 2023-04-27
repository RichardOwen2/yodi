import Joi from "joi";
import InvariantError from "@/backend/errors/InvariantError";

export const validateUpgradeAccountPayload = (payload: any) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
};