import statusCodes from "../utils/statusCodes";
import misc from "../helpers/misc";

const { serverError, success } = statusCodes;
const { successResponse, errorResponse } = misc;

export default class Menu {
  static getMenuItems = async (req, res) => {
    try {
      return successResponse(res, success, null, null, req.menuItems);
    } catch (error) {
      return errorResponse(res, serverError, error);
    }
  };
}
