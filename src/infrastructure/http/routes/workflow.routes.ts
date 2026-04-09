import { Router } from "express";
import { makeWorkflowController } from "@/main/factories/makeWorkflowController";
import { ensureAuthenticated } from "@/presentation/middlewares/ensureAuthenticated";
import { AccessRole } from "@/domain/entities/User";
import { ensureRole } from "@/presentation/middlewares/ensureRole";

const workflowRoutes = Router();
const controller = makeWorkflowController();

workflowRoutes.use(ensureAuthenticated);

workflowRoutes.post("/", (req, res) => controller.handleCreate(req, res));
workflowRoutes.get("/", (req, res) => controller.handleListMyWorkflows(req, res));
workflowRoutes.get("/management", ensureRole([AccessRole.ADMIN, AccessRole.MASTER]), (req, res) => controller.handleListManagement(req, res));
workflowRoutes.get("/:id", (req, res) => controller.handleGetDetail(req, res));

export { workflowRoutes };
