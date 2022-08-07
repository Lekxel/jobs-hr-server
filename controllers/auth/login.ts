import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { Request as ORequest, Response as OResponse } from "oauth2-server";
import allowJson from "../../helpers/allowJson";
import errorResponse from "../../helpers/response/error";
import fieldsError from "../../helpers/response/fieldsError";
import success from "../../helpers/response/success";
import oauth from "../../oauth";
import { getUserByEmail } from "./getUser";
const router = Router();
const Login = async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response
      .status(422)
      .json(errorResponse({}, null, fieldsError(errors.array())));
  }
  request.body.username = request.body.email;
  request.body.client_id = "jobs-hr";
  request.body.grant_type = "password";
  const req = new ORequest(request);
  const res = new OResponse(response);

  return oauth
    .token(req, res, {
      requireClientAuthentication: { password: false },
    })
    .then(async (token) => {
      let user = await getUserByEmail(token.user.email);
      if (user?.status === "suspended") {
        return response
          .status(401)
          .send(errorResponse({}, "Account Suspended", "account_suspended"));
      }
      return response.send(
        success(
          {
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            user: {
              _id: user?._id,
            },
          },
          "Login Successful"
        )
      );
    })
    .catch((error) =>
      response
        .status(error.code || 500)
        .send(
          errorResponse(
            {},
            error.message.replace(
              "Invalid grant: user credentials are invalid",
              "Incorrect login details"
            ),
            error.name.replace("invalid_grant", "invalid_login_details")
          )
        )
    );
};

router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Email is not valid"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .bail()
      .isLength({ min: 5, max: 30 })
      .withMessage("Password should be at least 4 chars  and  30 max"),
  ],
  allowJson,
  Login
);

export default router;
