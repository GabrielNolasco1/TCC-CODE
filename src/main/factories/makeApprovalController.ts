import { ApprovalRepository } from "@/infrastructure/database/typeorm/repositories/ApprovalRepository";
import { WorkflowRepository } from "@/infrastructure/database/typeorm/repositories/WorkflowRepository";
import { UserRepository } from "@/infrastructure/database/typeorm/repositories/UserRepository";
import { ApprovalController } from "@/presentation/controllers/ApprovalController";
import { ProcessApprovalActionUseCase } from "@/application/use-cases/ApprovalCases/ProcessApprovalActionUseCase";
import { ListPendingApprovalsUseCase } from "@/application/use-cases/ApprovalCases/ListPendingApprovalsUseCase";

export const makeApprovalController = (): ApprovalController => {
  const approvalRepo = new ApprovalRepository();
  const workflowRepo = new WorkflowRepository();
  const userRepo = new UserRepository();

  const processUseCase = new ProcessApprovalActionUseCase(approvalRepo, workflowRepo);
  const listPendingUseCase = new ListPendingApprovalsUseCase(approvalRepo, workflowRepo, userRepo);

  return new ApprovalController(
    processUseCase,
    listPendingUseCase
  );
};
