import bcrypt from "bcrypt";
import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import errorResponse from "../../helpers/response/error";
import fieldsError from "../../helpers/response/fieldsError";
import success from "../../helpers/response/success";
import User from "../../model/User";
import { getUserByEmail } from "./getUser";
const router = Router();

const Register = async function (
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

  let { email, password } = request.body;
  email = email.trim().toLowerCase();

  let userE = await getUserByEmail(email);

  if (userE) {
    return response.status(422).json(
      errorResponse({}, "Email already exist", {
        email: "Email already exist",
      })
    );
  }

  //Register
  else {
    const salt = bcrypt.genSaltSync(10);

    let newUser = {
      email: email,
      password: bcrypt.hashSync(password, salt),
      regDate: new Date(),
    };

    User.create({ ...newUser })
      .then(async function (user) {
        return response.send(
          success({ success: true }, "Registration Successful")
        );
      })
      .catch((e) => {
        console.log(e);
        response
          .status(500)
          .json(
            errorResponse({}, "Something went wrong, please try again later")
          );
      });
  }
};

router.post(
  "/register",
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
      .withMessage("Password should be at least 5 chars"),
  ],
  Register
);

export default router;
