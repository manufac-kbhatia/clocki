import express, { Router } from "express";
import * as organisationControllers from "../controllers/organisationController";
import { isAuthenticated, isAuthorized } from "../middlewares";
import catchAsync from "../middlewares/catchAsync";
import { Role } from "@repo/schemas";

const router: Router = express.Router();

router
  .route("/organisation")
  .post(isAuthenticated, isAuthorized([Role.Admin]), catchAsync(organisationControllers.setupOrganisation))
  .get(isAuthenticated, isAuthorized([Role.Admin]), catchAsync(organisationControllers.getOrganisation))
  .patch(isAuthenticated, isAuthorized([Role.Admin]), catchAsync(organisationControllers.updateOrganisation));

router
  .route("/organisation/:id")
  .delete(isAuthenticated, isAuthorized([Role.Admin]), catchAsync(organisationControllers.deleteOrganisation));

router
  .route("/organisation")
  .get(isAuthenticated, isAuthorized([Role.Admin]), catchAsync(organisationControllers.getOrganisation));

export default router;
