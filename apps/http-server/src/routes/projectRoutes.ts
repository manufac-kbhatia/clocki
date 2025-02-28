import { Router } from "express";
import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares";
import * as teamControllers from "../controllers/projectControllers";
import catchAsync from "../middlewares/catchAsync";
import { Role } from "@repo/schemas/enum";

const router: Router = express.Router();

router
  .route("/projects")
  .post(isAuthenticated, isAuthorized([Role.Admin, Role.Manager]), catchAsync(teamControllers.createProject));

export default router;
