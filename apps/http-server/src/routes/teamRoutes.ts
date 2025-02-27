import { Router } from "express";
import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares";
import { PrismaUtils } from "@repo/db";
import * as teamControllers from "../controllers/teamControllers";
import catchAsync from "../middlewares/catchAsync";

const router: Router = express.Router();

router
  .route("/teams")
  .post(
    isAuthenticated,
    isAuthorized([PrismaUtils.Role.Admin, PrismaUtils.Role.Manager]),
    catchAsync(teamControllers.createTeam),
  );

export default router;
