import { Router } from "express";
import { makeUserController } from "@/main/factories/makeUserController";

const userRoutes = Router();
const userController = makeUserController();

userRoutes.post("/", (req, res) => userController.handleCreate(req, res));
userRoutes.post("/login", (req, res) => userController.handleLogin(req, res));

export { userRoutes };