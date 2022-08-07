import { Router } from "express";

import PostApplication from "./create";
import Fetch from "./fetch";

const router = Router();

router.use("/", PostApplication);
router.use("/", Fetch);

export default router;
