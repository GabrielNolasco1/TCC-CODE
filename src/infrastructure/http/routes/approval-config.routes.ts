import { Router } from "express";
import { makeApprovalConfigController } from "@/main/factories/makeApprovalConfigController";
import { ensureAuthenticated } from "@/presentation/middlewares/ensureAuthenticated";
import { ensureRole } from "@/presentation/middlewares/ensureRole";
import { AccessRole } from "@/domain/entities/User";

const approvalConfigRoutes = Router();
const controller = makeApprovalConfigController();

approvalConfigRoutes.use(ensureAuthenticated);


approvalConfigRoutes.get("/:solicitationId", (req, res) => controller.handleGet(req, res));

// Apenas ADMIN ou MASTER
approvalConfigRoutes.post(
  "/",
  ensureRole([AccessRole.ADMIN, AccessRole.MASTER]),
  (req, res) => controller.handleSet(req, res)
);

export { approvalConfigRoutes };
