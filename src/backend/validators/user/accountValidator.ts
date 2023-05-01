import Joi from "joi";
import InvariantError from "@/backend/errors/InvariantError";

export const validatePutAccountPayload = (payload: any) => {
  const schema = Joi.object().or(
    'username',
    'image',
    'phoneNumber'
  ).options({ abortEarly: false });
  
  const validationResult = schema.validate(payload);
  
  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
  
  if (payload?.phoneNumber) {
    const phoneSchema = Joi.string().min(10).pattern(/^[0-9]+$/);
    const phoneResult = phoneSchema.validate(payload.phoneNumber);
  
    if (phoneResult.error) {
      throw new InvariantError('Invalid phone number format');
    }
  }
}
