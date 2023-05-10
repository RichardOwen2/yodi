import Joi from "joi";
import InvariantError from "@/backend/errors/InvariantError";

export const validatePostPaymentPayload = (payload: any) => {
  const schema = Joi.object({
    orderId: Joi.string().required(),
  });

  const validationResult = schema.validate(payload);

  if (validationResult.error) {
    throw new InvariantError(validationResult.error.message);
  }
};
