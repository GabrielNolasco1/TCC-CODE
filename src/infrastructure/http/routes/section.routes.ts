import { Router } from "express";
import { makeSectionController } from "@/main/factories/makeSectionController";
import { ensureAuthenticated } from "@/presentation/middlewares/ensureAuthenticated";
import { ensureRole } from "@/presentation/middlewares/ensureRole";
import { AccessRole } from "@/domain/entities/User";

const sectionRoutes = Router();
const controller = makeSectionController();

sectionRoutes.use(ensureAuthenticated);

const adminMasterOnly = ensureRole([AccessRole.ADMIN, AccessRole.MASTER]);

sectionRoutes.post("/", adminMasterOnly, (req, res) => controller.handleCreate(req, res));
sectionRoutes.delete("/:id", adminMasterOnly, (req, res) => controller.handleDelete(req, res));

export { sectionRoutes };
