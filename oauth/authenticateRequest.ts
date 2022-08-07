import { Request, Response, NextFunction } from "express";
import { Response as OResponse, Request as ORequest } from "oauth2-server";
import oauth from ".";
import errorResponse from "../helpers/response/error";

const authenticateRequest = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const req = new ORequest(request);
  const res = new OResponse(response);

  return oauth
    .authenticate(req, res, {})
    .then((token) => {
      response.locals.userID = token.user._id;
      next();
    })
    .catch((error) =>
      response
        .status(error.code || 500)
        .send(errorResponse({}, error.message, error.name))
    );
};

export default authenticateRequest;
