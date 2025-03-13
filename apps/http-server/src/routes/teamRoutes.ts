import { Router } from "express";
import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares";
import * as teamControllers from "../controllers/teamControllers";
import catchAsync from "../middlewares/catchAsync";
import { Role } from "@repo/schemas";

const router: Router = express.Router();

router
  .route("/team")
  .get(isAuthenticated, isAuthorized([Role.Admin, Role.Manager]), catchAsync(teamControllers.getTeams))
  .post(isAuthenticated, isAuthorized([Role.Admin, Role.Manager]), catchAsync(teamControllers.createTeam));

router
  .route("/team/:id")
  .delete(isAuthenticated, isAuthorized([Role.Admin, Role.Manager]), catchAsync(teamControllers.deleteTeam));

export default router;
