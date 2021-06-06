import payments from "../validations/payments";
import helpers from "../helpers/misc";
import statusCodes from "../utils/statusCodes";
import stripeConfig from "../config/stripeConfig";

const { returnErrorMessages, errorResponse, successResponse } = helpers;
const { success, serverError } = statusCodes;
const { initiatePayment } = payments;

const validateInitiatePayment = async (req, res, next) => {
  const { error } = initiatePayment(req.body);
  returnErrorMessages(error, res, next);
};

const generatePaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripeConfig.paymentIntents.create({
      amount,
      currency: "usd",
    });
    const data = {
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      clientSecret: paymentIntent.client_secret,
    };
    return successResponse(res, success, null, null, data);
  } catch (error) {
    return errorResponse(res, serverError, error.message);
  }
};

export default {
  validateInitiatePayment,
  generatePaymentIntent,
};
