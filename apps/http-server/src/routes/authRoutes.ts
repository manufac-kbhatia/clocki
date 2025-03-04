import express, { Router } from "express";
import * as authControllers from "../controllers/authControllers";
import catchAsync from "../middlewares/catchAsync";

const router: Router = express.Router();

router.route("/auth/login").post(catchAsync(authControllers.login));

export default router;
