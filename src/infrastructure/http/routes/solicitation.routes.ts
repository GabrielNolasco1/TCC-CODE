import { Router } from "express";
import { makeSolicitationController } from "@/main/factories/makeSolicitationController";
import { ensureAuthenticated } from "@/presentation/middlewares/ensureAuthenticated";
import { ensureRole } from "@/presentation/middlewares/ensureRole";
import { AccessRole } from "@/domain/entities/User";

const solicitationRoutes = Router();
const controller = makeSolicitationController();

solicitationRoutes.use(ensureAuthenticated);

solicitationRoutes.get("/", (req, res) => controller.handleList(req, res));
solicitationRoutes.get("/:id/form", (req, res) => controller.handleGetForm(req, res));


const adminOrMaster = ensureRole([AccessRole.ADMIN, AccessRole.MASTER]);

solicitationRoutes.post("/", adminOrMaster, (req, res) => controller.handleCreate(req, res));
solicitationRoutes.patch("/:id", adminOrMaster, (req, res) => controller.handleUpdate(req, res));
solicitationRoutes.delete("/:id", adminOrMaster, (req, res) => controller.handleDelete(req, res));

export { solicitationRoutes };
