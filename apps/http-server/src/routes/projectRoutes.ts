import { Router } from "express";
import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares";
import * as projectControllers from "../controllers/projectControllers";
import catchAsync from "../middlewares/catchAsync";
import { Role } from "@repo/schemas";

const router: Router = express.Router();

router
  .route("/project")
  .get(isAuthenticated, isAuthorized([Role.Admin, Role.Manager]), catchAsync(projectControllers.getProjects))
  .post(isAuthenticated, isAuthorized([Role.Admin, Role.Manager]), catchAsync(projectControllers.createProject));

router
  .route("/project/:id")
  .post(isAuthenticated, isAuthorized([Role.Admin, Role.Manager]), catchAsync(projectControllers.updateProject))
  .get(isAuthenticated, isAuthorized([Role.Admin, Role.Manager]), catchAsync(projectControllers.getProject));

export default router;
