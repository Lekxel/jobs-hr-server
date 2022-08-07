import { NextFunction, Request, Response, Router } from "express";
import allowJson from "../../helpers/allowJson";
import errorResponse from "../../helpers/response/error";
import success from "../../helpers/response/success";
import { getUserByID } from "./getUser";
const router = Router();

const TheUser = async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.params;
  try {
    let user = await getUserByID(id);

    if (user) {
      // TODO: remove sensitive fields
      return response.send(
        success({ user: { ...user.toObject(), password: undefined } })
      );
    }
    return response.status(400).send(errorResponse({}, "User not found!"));
  } catch (e) {
    return response.status(400).send(errorResponse({}, "User not found!"));
  }
};

router.get("/user/:id", [], allowJson, TheUser);

export default router;
