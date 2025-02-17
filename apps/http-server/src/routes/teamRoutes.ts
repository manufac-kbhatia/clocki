import { Router } from "express";
import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares";
import { Role } from "@repo/db";
import * as teamControllers from "../controllers/teamControllers";

const router: Router = express.Router();

router
  .route("/teams")
  .post(
    isAuthenticated,
    isAuthorized([Role.Admin, Role.Manager]),
    teamControllers.createTeam
  );

export default router;
