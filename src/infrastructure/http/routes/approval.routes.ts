import { Router } from "express";
import { makeApprovalController } from "@/main/factories/makeApprovalController";
import { ensureAuthenticated } from "@/presentation/middlewares/ensureAuthenticated";

const approvalRoutes = Router();
const controller = makeApprovalController();

approvalRoutes.use(ensureAuthenticated);

approvalRoutes.get("/me", (req, res) => controller.handleListMyPending(req, res));
approvalRoutes.post("/process", (req, res) => controller.handleProcess(req, res));

export { approvalRoutes };
