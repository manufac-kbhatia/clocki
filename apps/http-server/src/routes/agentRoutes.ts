import express, { Router } from "express";
import * as agentControllers from "../controllers/agentControllers";
import catchAsync from "../middlewares/catchAsync";
import { isAuthenticated } from "../middlewares";

const router: Router = express.Router();

router.route("/agent").post(isAuthenticated, catchAsync(agentControllers.agent));

export default router;
