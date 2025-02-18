import express, { Router } from "express";
import * as organisationControllers from "../controllers/organisationController";
import { isAuthenticated, isAuthorized } from "../middlewares";
import { Role } from "@repo/db";

const router: Router = express.Router();

router
  .route("/organisations")
  .post(
    isAuthenticated,
    isAuthorized([Role.Admin]),
    organisationControllers.setupOrganisation
  );

router
  .route("/organisations/:id")
  .delete(
    isAuthenticated,
    isAuthorized([Role.Admin]),
    organisationControllers.deleteOrganisation
  );

router
  .route("/organisations/:id")
  .get(
    isAuthenticated,
    isAuthorized([Role.Admin]),
    organisationControllers.deleteOrganisation
  );

export default router;
