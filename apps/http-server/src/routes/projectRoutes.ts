import { Router } from "express";
import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares";
import { Role } from "@repo/db";
import * as teamControllers from "../controllers/projectControllers";

const router: Router = express.Router();

router
  .route("/projects")
  .post(
    isAuthenticated,
    isAuthorized([Role.Admin, Role.Manager]),
    teamControllers.createProject
  );

export default router;
