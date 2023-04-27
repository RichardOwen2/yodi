import Joi from "joi";
import InvariantError from "@/backend/errors/InvariantError";

export const validatePostLoginPayload = (payload: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
};
