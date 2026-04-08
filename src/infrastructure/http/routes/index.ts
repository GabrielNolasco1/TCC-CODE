import { Router } from "express";
import { userRoutes } from "./user.routes";
import { tokenRoutes } from "./token.routes";
import { areaRoutes } from "./area.routes";
import { sectionRoutes } from "./section.routes";
import { answerRoutes } from "./answer.routes";
import { approvalRoutes } from "./approval.routes";
import { approvalConfigRoutes } from "./approval-config.routes";
import { approvalFlowRoutes } from "./approval-flow.routes";
import { inputRoutes } from "./input.routes";
import { workflowRoutes } from "./workflow.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/tokens", tokenRoutes);
router.use("/areas", areaRoutes);
router.use("/solicitations", sectionRoutes);
router.use("/sections", sectionRoutes);
router.use("/answers", answerRoutes);
router.use("/approvals", approvalRoutes);
router.use("/config-approvals", approvalConfigRoutes);
router.use("/flow-approvals", approvalFlowRoutes);
router.use("/inputs", inputRoutes);
router.use("/workflows", workflowRoutes);

export { router };
