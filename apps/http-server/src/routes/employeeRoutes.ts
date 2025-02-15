import express, { Router } from "express";
import * as employeeControllers from "../controllers/employeeControllers";

const router: Router = express.Router();

router.route("/register").post(employeeControllers.register);

export default router;
