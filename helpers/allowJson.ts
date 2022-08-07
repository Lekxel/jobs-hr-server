import { Request, Response, NextFunction } from "express";

const allowJson = function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (request.is("json"))
    request.headers["content-type"] = "application/x-www-form-urlencoded";

  next();
};

export default allowJson;
