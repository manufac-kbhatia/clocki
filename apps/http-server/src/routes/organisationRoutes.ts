import express, { Router } from "express";
import * as organisationControllers from "../controllers/organisationController";
import { isAuthenticated, isAuthorized } from "../middlewares";
import catchAsync from "../middlewares/catchAsync";
import { Role } from "@repo/schemas/enum";

const router: Router = express.Router();

router
  .route("/organisations")
  .post(isAuthenticated, isAuthorized([Role.Admin]), catchAsync(organisationControllers.setupOrganisation));

router
  .route("/organisations/:id")
  .delete(isAuthenticated, isAuthorized([Role.Admin]), catchAsync(organisationControllers.deleteOrganisation));

router
  .route("/organisations/:id")
  .get(isAuthenticated, isAuthorized([Role.Admin]), catchAsync(organisationControllers.deleteOrganisation));

export default router;
