import { Router } from "express";
import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares";
import { PrismaUtils } from "@repo/db";
import * as teamControllers from "../controllers/projectControllers";
import catchAsync from "../middlewares/catchAsync";

const router: Router = express.Router();

router
  .route("/projects")
  .post(
    isAuthenticated,
    isAuthorized([PrismaUtils.Role.Admin, PrismaUtils.Role.Manager]),
    catchAsync(teamControllers.createProject),
  );

export default router;
