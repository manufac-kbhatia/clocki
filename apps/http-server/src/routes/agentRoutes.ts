import express, { Router } from "express";
import * as agentControllers from "../controllers/agentControllers";
import catchAsync from "../middlewares/catchAsync";

const router: Router = express.Router();

router.route("/agent").post(catchAsync(agentControllers.agent));

export default router;
