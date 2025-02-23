import { Router } from "express";
import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares";
import { PrismaUtils } from "@repo/db";
import * as teamControllers from "../controllers/projectControllers";

const router: Router = express.Router();

router
  .route("/projects")
  .post(
    isAuthenticated,
    isAuthorized([PrismaUtils.Role.Admin, PrismaUtils.Role.Manager]),
    teamControllers.createProject
  );

export default router;
