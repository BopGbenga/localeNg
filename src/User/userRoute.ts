import express, { Router } from "express";
import userController from "./user.controller";
import userValidation from "./user.Validation";

const router: Router = express.Router();

router.post("/signup", userValidation.register, userController.createUser);
router.post("/login", userValidation.validateLogin, userController.login);

export default router;
