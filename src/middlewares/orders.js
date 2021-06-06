import _ from "lodash";
import orders from "../validations/orders";
import helpers from "../helpers/misc";
import models from "../database/models";
import services from "../services/services";
import statusCodes from "../utils/statusCodes";
import messages from "../utils/messages";

const { placeOrder, getOrder, updateOrder } = orders;
const { returnErrorMessages, errorResponse } = helpers;
const { Order, Contents, User } = models;
const { findOrderByConditionAll, findAllOrders, findAllUserOrders } = services;
const { notFound, serverError, conflict } = statusCodes;
const { orderNotFound, ordersListNotFound, orderUpdateConflict } = messages;

const validatePlaceOrder = async (req, res, next) => {
  const { error } = placeOrder(req.body);
  returnErrorMessages(error, res, next);
};

const validateGetOrder = async (req, res, next) => {
  const { error } = getOrder(req.params);
  returnErrorMessages(error, res, next);
};

const findOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const condition = { id };
    const orderData = await findOrderByConditionAll(
      Order,
      condition,
      Contents,
      User
    );
    if (!orderData) {
      return errorResponse(res, notFound, orderNotFound);
    }
    req.orderData = orderData.dataValues;
    return next();
  } catch (error) {
    return errorResponse(res, serverError, error);
  }
};

const findUserOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userData.id;
    const condition = { id, userId };
    const orderData = await findOrderByConditionAll(
      Order,
      condition,
      Contents,
      User
    );
    if (!orderData) {
      return errorResponse(res, notFound, orderNotFound);
    }
    req.orderData = orderData.dataValues;
    return next();
  } catch (error) {
    return errorResponse(res, serverError, error);
  }
};

const findOrdersList = async (req, res, next) => {
  try {
    let orders;
    const userId = req.userData.id;
    const condition = { userId };
    if (req.userData.role === "customer") {
      orders = await findAllUserOrders(Order, Contents, condition);
    } else {
      orders = await findAllOrders(Order, Contents, User);
    }
    if (_.isEmpty(orders)) {
      return errorResponse(res, notFound, ordersListNotFound);
    }
    req.ordersList = orders;
    return next();
  } catch (error) {
    return errorResponse(res, serverError, error);
  }
};

const validateUpdateOrder = async (req, res, next) => {
  const { error } = updateOrder(req.body);
  returnErrorMessages(error, res, next);
};

const checkOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const existingStatus = req.orderData.status;
    if (status === existingStatus) {
      return errorResponse(res, conflict, orderUpdateConflict);
    }
    return next();
  } catch (error) {
    return errorResponse(res, serverError, error);
  }
};

export default {
  validatePlaceOrder,
  validateGetOrder,
  findOrderById,
  findOrdersList,
  findUserOrderById,
  validateUpdateOrder,
  checkOrderStatus,
};
