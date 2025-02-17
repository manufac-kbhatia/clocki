import express, { Router } from "express";
import * as authControllers from "../controllers/authControllers";

const router: Router = express.Router();

router.route("/auth/login").post(authControllers.login);

export default router;
