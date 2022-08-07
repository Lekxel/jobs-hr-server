import { Router } from "express";

import CreateJob from "./create";
import FetchJobs from "./fetch";

const router = Router();

router.use("/", CreateJob);
router.use("/", FetchJobs);

export default router;
