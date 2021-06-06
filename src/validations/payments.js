import Joi from "joi";
import messages from "../utils/messages";
import authentication from "./authentication";

const { createErrorMessages } = authentication;

const initiatePayment = (data) => {
  const schema = Joi.object({
    amount: Joi.number()
      .min(1)
      .precision(2)
      .required()
      .messages(
        createErrorMessages(
          "number",
          `${messages.emptyAmount}`,
          `${messages.invalidAmount}`,
          `${messages.invalidAmount}`,
          `${messages.invalidAmount}`
        )
      ),
  });
  return schema.validate(data, {
    abortEarly: false,
    allowUnknown: false,
  });
};

export default { initiatePayment };
