import express, { Router } from "express";
import * as organisationControllers from "../controllers/organisationController";
import { isAuthenticated } from "../middlewares";

const router: Router = express.Router();

router
  .route("/setup")
  .post(isAuthenticated, organisationControllers.setupOrganisatipo);

export default router;
