import express, { Router } from "express";
import * as employeeControllers from "../controllers/employeeControllers";
import { isAuthenticated, isAuthorized } from "../middlewares";
import catchAsync from "../middlewares/catchAsync";
import { Role } from "@repo/schemas";

const router: Router = express.Router();

router.route("/register").post(catchAsync(employeeControllers.register));
router.route("/employee/me").get(isAuthenticated, catchAsync(employeeControllers.getMe));

router
  .route("/employee")
  .post(isAuthenticated, isAuthorized([Role.Admin, Role.Hr]), catchAsync(employeeControllers.createEmployee))
  .get(isAuthenticated, isAuthorized([Role.Admin, Role.Hr]), catchAsync(employeeControllers.getEmployees));
router
  .route("/employee/:id")
  .get(isAuthenticated, isAuthorized([Role.Admin, Role.Hr]), catchAsync(employeeControllers.getEmployee))
  .put(isAuthenticated, isAuthorized([Role.Admin, Role.Hr]), catchAsync(employeeControllers.updateEmployee));

export default router;
