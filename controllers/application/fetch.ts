import { NextFunction, Request, Response, Router } from "express";
import allowJson from "../../helpers/allowJson";
import success from "../../helpers/response/success";
import Appplication from "../../model/Application";
const router = Router();

const FetchApplications = async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  let applications = await Appplication.find({})
    .populate("job", "title")
    .sort({ _id: -1 });
  return response.send(
    success({
      applications,
      success: true,
    })
  );
};

router.get("/fetch", [], allowJson, FetchApplications);

export default router;
