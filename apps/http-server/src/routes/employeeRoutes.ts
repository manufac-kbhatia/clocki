import express, { Router } from "express";
import * as employeeControllers from "../controllers/employeeControllers";

const router: Router = express.Router();

router.get("/", employeeControllers.createEmployee);

export default router;
