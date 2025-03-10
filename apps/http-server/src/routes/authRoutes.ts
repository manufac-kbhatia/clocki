import express, { Router } from "express";
import * as authControllers from "../controllers/authControllers";
import catchAsync from "../middlewares/catchAsync";

const router: Router = express.Router();

router.route("/auth/login").post(catchAsync(authControllers.login));
router.route("/auth/logout").post(catchAsync(authControllers.logout));
router.route("/auth/refresh").get(catchAsync(authControllers.refreshToken));

export default router;
