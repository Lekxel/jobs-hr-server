import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import allowJson from "../../helpers/allowJson";
import errorResponse from "../../helpers/response/error";
import fieldsError from "../../helpers/response/fieldsError";
import success from "../../helpers/response/success";
import Appplication from "../../model/Application";
const router = Router();

const CreateJob = async function (
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

  const { name, email, phone, info, race, nationality, job } = request.body;

  await Appplication.create({
    name,
    email,
    phone,
    info,
    race,
    nationality,
    job,
  })
    .then((job) => {
      return response.send(
        success(
          {
            job,
            success: true,
          },
          "Application submitted successfully"
        )
      );
    })
    .catch((error) =>
      response
        .status(error.code || 500)
        .send(errorResponse({}, "something went wrong"))
    );

  return response.status(500).send(errorResponse({}, "something went wrong"));
};

router.post(
  "/create",
  [
    body("job")
      .notEmpty()
      .withMessage("job is required")
      .bail()
      .isMongoId()
      .withMessage("job is not valid"),
    body("race")
      .notEmpty()
      .withMessage("race is required")
      .bail()
      .isString()
      .withMessage("race is not valid"),
    body("name")
      .notEmpty()
      .withMessage("name is required")
      .bail()
      .isString()
      .withMessage("name is not valid"),
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .bail()
      .isEmail()
      .withMessage("email is not valid"),
    body("nationality")
      .notEmpty()
      .withMessage("nationality is required")
      .bail()
      .isString()
      .withMessage("nationality is not valid"),
    body("info")
      .notEmpty()
      .withMessage("info is required")
      .bail()
      .isString()
      .withMessage("info is not valid"),
  ],
  allowJson,
  CreateJob
);

export default router;
