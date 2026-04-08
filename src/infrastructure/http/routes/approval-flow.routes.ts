import { Router } from "express";
import { makeApprovalFlowController } from "@/main/factories/makeApprovalFlowController";
import { ensureAuthenticated } from "@/presentation/middlewares/ensureAuthenticated";
import { ensureRole } from "@/presentation/middlewares/ensureRole";
import { AccessRole } from "@/domain/entities/User";

const approvalFlowRoutes = Router();
const controller = makeApprovalFlowController();

approvalFlowRoutes.use(ensureAuthenticated);


approvalFlowRoutes.get("/:solicitationId", (req, res) => controller.handleGet(req, res));

// Apenas ADMIN ou MASTER podem configurar os aprovadores fixos
approvalFlowRoutes.post(
  "/",
  ensureRole([AccessRole.ADMIN, AccessRole.MASTER]),
  (req, res) => controller.handleSet(req, res)
);

export { approvalFlowRoutes };
