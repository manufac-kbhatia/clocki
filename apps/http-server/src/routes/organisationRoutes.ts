import express, { Router } from "express";
import * as organisationControllers from "../controllers/organisationController";
import { isAuthenticated, isAuthorized } from "../middlewares";
import { PrismaUtils } from "@repo/db";

const router: Router = express.Router();

router
  .route("/organisations")
  .post(
    isAuthenticated,
    isAuthorized([PrismaUtils.Role.Admin]),
    organisationControllers.setupOrganisation
  );

router
  .route("/organisations/:id")
  .delete(
    isAuthenticated,
    isAuthorized([PrismaUtils.Role.Admin]),
    organisationControllers.deleteOrganisation
  );

router
  .route("/organisations/:id")
  .get(
    isAuthenticated,
    isAuthorized([PrismaUtils.Role.Admin]),
    organisationControllers.deleteOrganisation
  );

export default router;
