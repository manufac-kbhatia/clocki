import { Router } from "express";
import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares";
import * as clientControllers from "../controllers/clientControllers";
import catchAsync from "../middlewares/catchAsync";
import { Role } from "@repo/schemas";

const router: Router = express.Router();

router
  .route("/client")
  .get(isAuthenticated, isAuthorized([Role.Admin, Role.Manager]), catchAsync(clientControllers.getClients))
  .post(isAuthenticated, isAuthorized([Role.Admin, Role.Manager]), catchAsync(clientControllers.createClient));

export default router;
