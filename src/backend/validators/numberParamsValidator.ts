import Joi from "joi";
import InvariantError from "@/backend/errors/InvariantError";

export const validateNumberParams = (payload: any) => {
  const schema = Joi.string().custom((value, helpers) => {
    if (isNaN(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }, 'custom validation').allow(null)


  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
};