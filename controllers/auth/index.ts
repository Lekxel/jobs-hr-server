import { Router } from "express";
import GetUser from "./get_user";
import Login from "./login";
import Register from "./register";
import User from "./user";

const router = Router();

router.use("/", Login);
router.use("/", Register);
router.use("/", GetUser);
router.use("/", User);

export default router;
