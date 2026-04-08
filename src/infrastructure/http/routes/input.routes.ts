import { Router } from "express";
import { makeInputController } from "@/main/factories/makeInputController";
import { ensureAuthenticated } from "@/presentation/middlewares/ensureAuthenticated";
import { ensureRole } from "@/presentation/middlewares/ensureRole";
import { AccessRole } from "@/domain/entities/User";

const inputRoutes = Router();
const controller = makeInputController();

inputRoutes.use(ensureAuthenticated);


inputRoutes.post("/", ensureRole([AccessRole.ADMIN, AccessRole.MASTER]), (req, res) => controller.handleCreate(req, res));

export { inputRoutes };
