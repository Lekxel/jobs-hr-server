import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import allowJson from "../../helpers/allowJson";
import errorResponse from "../../helpers/response/error";
import fieldsError from "../../helpers/response/fieldsError";
import success from "../../helpers/response/success";
import Job from "../../model/Job";
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

  const {
    title,
    description,
    salary,
    location,
    company,
    jobType,
    category,
    deadline,
  } = request.body;

  await Job.create({
    title,
    description,
    salary,
    location,
    company,
    jobType,
    category,
    deadline,
  })
    .then((job) => {
      return response.send(
        success(
          {
            job,
            success: true,
          },
          "Job Created"
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
    body("title")
      .notEmpty()
      .withMessage("title is required")
      .bail()
      .isString()
      .withMessage("title is not valid"),
    body("company")
      .notEmpty()
      .withMessage("company is required")
      .bail()
      .isString()
      .withMessage("company is not valid"),
    body("jobType")
      .notEmpty()
      .withMessage("jobType is required")
      .bail()
      .isString()
      .withMessage("jobType is not valid"),
    body("category")
      .notEmpty()
      .withMessage("category is required")
      .bail()
      .isString()
      .withMessage("category is not valid"),
    body("location")
      .notEmpty()
      .withMessage("location is required")
      .bail()
      .isString()
      .withMessage("location is not valid"),
    body("salary")
      .notEmpty()
      .withMessage("salary is required")
      .bail()
      .isNumeric()
      .withMessage("salary is not valid"),
    body("deadline")
      .notEmpty()
      .withMessage("deadline is required")
      .bail()
      .isString()
      .withMessage("deadline is not valid"),
    body("description")
      .notEmpty()
      .withMessage("description is required")
      .bail()
      .isString()
      .withMessage("description is not valid"),
  ],
  allowJson,
  CreateJob
);

export default router;
