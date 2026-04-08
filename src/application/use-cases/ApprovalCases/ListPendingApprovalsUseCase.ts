import { IApprovalRepository } from "@/domain/repositories/IApprovalRepository";
import { IWorkflowRepository } from "@/domain/repositories/IWorkflowRepository";
import { IUserRepository } from "@/domain/repositories/IUserRepository";

export class ListPendingApprovalsUseCase {
  constructor(
    private approvalRepo: IApprovalRepository,
    private workflowRepo: IWorkflowRepository,
    private userRepo: IUserRepository
  ) {}

  async execute(approverId: string) {
    const approvals = await this.approvalRepo.findPendingByApproverId(approverId);

    return await Promise.all(
      approvals.map(async (app) => {
        const workflow = await this.workflowRepo.findById(app.workflowId);
        const requester = await this.userRepo.findById(workflow?.creatorId || "");

        return {
          id: app.id,
          workflowId: app.workflowId,
          workflowTitle: workflow?.title || "Sem título",
          requesterName: requester?.name || "Usuário removido",
          createdAt: app.createdAt
        };
      })
    );
  }
}
