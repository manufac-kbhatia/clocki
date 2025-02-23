import express, { Router } from "express";
import * as employeeControllers from "../controllers/employeeControllers";
import { isAuthenticated, isAuthorized } from "../middlewares";
import { PrismaUtils } from "@repo/db";
import catchAsync from "../middlewares/catchAsync";

const router: Router = express.Router();

router.route("/register").post(catchAsync(employeeControllers.register));
router
  .route("/employees")
  .post(
    isAuthenticated,
    isAuthorized([PrismaUtils.Role.Admin, PrismaUtils.Role.Hr]),
    catchAsync(employeeControllers.createEmployee)
  );
router
  .route("/employees/:id")
  .get(
    isAuthenticated,
    isAuthorized([PrismaUtils.Role.Admin, PrismaUtils.Role.Hr]),
    catchAsync(employeeControllers.getEmployee)
  );
router
  .route("/employees/:id")
  .put(
    isAuthenticated,
    isAuthorized([PrismaUtils.Role.Admin, PrismaUtils.Role.Hr]),
    catchAsync(employeeControllers.updateEmployee)
  );

router.route("/me").get(isAuthenticated, catchAsync(employeeControllers.getMe));

export default router;
