import { Router } from "express";
import { makeUserController } from "@/main/factories/makeUserController";
import { ensureAuthenticated } from "@/presentation/middlewares/ensureAuthenticated";
import { AccessRole } from "@/domain/entities/User";
import { ensureRole } from "@/presentation/middlewares/ensureRole";

const userRoutes = Router();
const userController = makeUserController();

userRoutes.post("/", (req, res) => userController.handleCreate(req, res));
userRoutes.post("/login", (req, res) => userController.handleLogin(req, res));
userRoutes.get("/", ensureAuthenticated, (req, res) => userController.handleList(req, res));
userRoutes.patch("/:id",  ensureAuthenticated, ensureRole([AccessRole.MASTER]), (req, res) => userController.handleUpdate(req, res));

export { userRoutes };
