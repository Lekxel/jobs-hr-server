import { NextFunction, Request, Response, Router } from "express";
import allowJson from "../../helpers/allowJson";
import errorResponse from "../../helpers/response/error";
import success from "../../helpers/response/success";
import User from "../../model/User";
import authenticateRequest from "../../oauth/authenticateRequest";
import { removeFalsyValues } from "../../utils";
const router = Router();

const TheUser = async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (response.locals.userID) {
    let user = await User.findOne(
      { _id: response.locals.userID },
      { password: 0 }
    );

    if (user) {
      return response.send(
        success({ user: removeFalsyValues(user.toObject()) })
      );
    }
  }
  return response.status(400).send(errorResponse({}, "User not found!"));
};

router.get("/me", [], allowJson, authenticateRequest, TheUser);

export default router;
