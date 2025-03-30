import { Router } from "express";
import express from "express";
// import { isAuthenticated, isAuthorized } from "../middlewares";
// import catchAsync from "../middlewares/catchAsync";
// import { Role } from "@repo/schemas";
// import { addTimeEntry, getMyTimeEntries, getTimeEntries } from "../controllers/timeSheetControllers";

const router: Router = express.Router();

// router
//   .route("/log-time")
//   .get(isAuthenticated, catchAsync(getMyTimeEntries))
//   .post(isAuthenticated, isAuthorized([Role.Admin, Role.Manager]), catchAsync(addTimeEntry));

// router
//   .route("/time-logs")
//   .get(isAuthenticated, isAuthorized([Role.Admin, Role.Manager]), catchAsync(getTimeEntries));

export default router;
