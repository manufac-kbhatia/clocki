import { Router } from "express";
import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares";
import * as timeSheetControllers from "../controllers/timeSheetControllers";
import catchAsync from "../middlewares/catchAsync";
import { Role } from "@repo/schemas";

const router: Router = express.Router();

router
  .route("/log-time")
  .get(isAuthenticated, catchAsync(timeSheetControllers.getMyTimeEntries))
  .post(isAuthenticated, isAuthorized([Role.Admin, Role.Manager]), catchAsync(timeSheetControllers.addTimeEntry));

router
  .route("/time-logs")
  .get(isAuthenticated, isAuthorized([Role.Admin, Role.Manager]), catchAsync(timeSheetControllers.getTimeEntries));

export default router;
