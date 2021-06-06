import _ from "lodash";
import statusCodes from "../utils/statusCodes";
import messages from "../utils/messages";
import misc from "../helpers/misc";
import services from "../services/services";
import models from "../database/models";
import redisClient from "../config/redisConfig";
import roles from "../utils/roles";

const { created, serverError, success, unauthorized } = statusCodes;
const {
  otpMessage,
  signupSuccessful,
  verifySuccessful,
  resendOTPSuccessful,
  loginSuccessful,
  logoutSuccessful,
  loginUserWrongCredentials,
} = messages;
const {
  successResponse,
  errorResponse,
  generateToken,
  generateOTP,
  sendOTP,
  generateHashedPassword,
} = misc;
const { saveData, updateByCondition } = services;
const { User } = models;
const { CUSTOMER } = roles;

export default class Authentication {
  static signUp = async (req, res) => {
    try {
      const { firstName, lastName, phoneNumber, address, password } = req.body;

      const hashedPassword = await generateHashedPassword(password);

      const otpCode = await generateOTP();

      const userObject = {
        firstName,
        lastName,
        phoneNumber,
        address,
        password: hashedPassword,
        otp: otpCode,
        role: CUSTOMER,
      };

      const data = await saveData(User, userObject);

      if (process.env.NODE_ENV === "production") {
        await sendOTP(phoneNumber, `${otpMessage} ${otpCode}`);
      }
      const userData = _.omit(data, ["id", "password"]);

      const tokenData = _.pick(data, ["id", "phoneNumber", "status"]);

      const token = await generateToken(tokenData);

      return successResponse(res, created, signupSuccessful, token, userData);
    } catch (error) {
      return errorResponse(res, serverError, error);
    }
  };

  static verify = async (req, res) => {
    try {
      const { phoneNumber } = req.userData;
      const condition = { phoneNumber };
      const data = { status: true };
      const { dataValues } = await updateByCondition(User, data, condition);
      const updatedData = _.omit(dataValues, ["id", "password", "otp"]);
      return successResponse(res, success, verifySuccessful, null, updatedData);
    } catch (error) {
      return errorResponse(res, serverError, error);
    }
  };

  static resendOTP = async (req, res) => {
    try {
      const { phoneNumber, otp } = req.userData;
      const otpCode = parseInt(otp, 10);
      if (process.env.NODE_ENV === "production") {
        await sendOTP(phoneNumber, `${otpMessage} ${otpCode}`);
      }
      return successResponse(res, success, resendOTPSuccessful, null, null);
    } catch (error) {
      return errorResponse(res, serverError, error);
    }
  };

  static login = async (req, res) => {
    try {
      const tokenData = _.omit(req.userData, ["password", "otp"]);
      const token = await generateToken(tokenData);
      const data = _.omit(req.userData, ["id", "password", "otp"]);
      return successResponse(res, success, loginSuccessful, token, data);
    } catch (error) {
      return errorResponse(res, serverError, error);
    }
  };

  static logout = async (req, res) => {
    try {
      const token = req.get("authorization").split(" ").pop();
      redisClient.sadd("token", token);
      return successResponse(res, success, logoutSuccessful, null, null);
    } catch (error) {
      return errorResponse(res, unauthorized, loginUserWrongCredentials);
    }
  };
}
