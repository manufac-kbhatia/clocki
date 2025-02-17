import express, { Router } from "express";
import * as employeeControllers from "../controllers/employeeControllers";
import { isAuthenticated, isAuthorized } from "../middlewares";
import { Role } from "@repo/db";

const router: Router = express.Router();

router.route("/register").post(employeeControllers.register);
router
  .route("/employees")
  .post(
    isAuthenticated,
    isAuthorized([Role.Admin, Role.Hr]),
    employeeControllers.createEmployee
  );
router
  .route("/employees/:id")
  .put(
    isAuthenticated,
    isAuthorized([Role.Admin, Role.Hr]),
    employeeControllers.updateEmployee
  );

export default router;
