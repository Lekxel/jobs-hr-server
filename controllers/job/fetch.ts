import { NextFunction, Request, Response, Router } from "express";
import allowJson from "../../helpers/allowJson";
import success from "../../helpers/response/success";
import Job from "../../model/Job";
import { removeFalsyValues } from "../../utils";
const router = Router();

const FetchJobs = async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const location = request.query.location;
  const jobType = request.query.jobType;
  const search = request.query.search;
  const sortBy: any = Number(request.query.sortBy) || -1;
  const category = request.query.category;

  const filter = removeFalsyValues({
    location,
    jobType,
    category,
  });
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  let jobs = await Job.find(filter).sort({ _id: sortBy });
  return response.send(
    success({
      jobs,
      success: true,
    })
  );
};

router.get("/fetch", [], allowJson, FetchJobs);

export default router;
