import { Router } from "express";
import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares";
import * as timeSheetControllers from "../controllers/timesheetControllers";
import catchAsync from "../middlewares/catchAsync";
import { Role } from "@repo/schemas";

const router: Router = express.Router();

router
  .route("/log-time")
  .get(isAuthenticated, catchAsync(timeSheetControllers.getMyTimeEntries))
  .post(isAuthenticated, isAuthorized([Role.Admin, Role.Manager]), catchAsync(timeSheetControllers.addTimeEntry));

export default router;
