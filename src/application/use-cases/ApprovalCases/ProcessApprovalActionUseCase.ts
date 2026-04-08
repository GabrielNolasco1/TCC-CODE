import { ApprovalStatus, Approval } from "@/domain/entities/Approval";
import { WorkflowProgress, WorkflowStatus } from "@/domain/entities/Workflow";
import { IApprovalRepository } from "@/domain/repositories/IApprovalRepository";
import { IWorkflowRepository } from "@/domain/repositories/IWorkflowRepository";

export type ProcessApprovalDTO = {
  approvalId: string;
  action: ApprovalStatus;
  comments?: string;
};

export class ProcessApprovalActionUseCase {
  constructor(
    private approvalRepo: IApprovalRepository,
    private workflowRepo: IWorkflowRepository
  ) {}

  async execute(data: ProcessApprovalDTO, requesterId: string): Promise<Approval> {
    const approval = await this.approvalRepo.findById(data.approvalId);
    if (!approval) throw new Error("Approval not found.");

    if (approval.approverId !== requesterId) {
      throw new Error("Access denied. You are not the approver for this step.");
    }

    if (approval.status !== ApprovalStatus.PENDING) {
      throw new Error("This approval has already been processed.");
    }

    approval.status = data.action;
    approval.comments = data.comments ?? null;
    await this.approvalRepo.save(approval);

    const workflow = await this.workflowRepo.findById(approval.workflowId);
    if (!workflow) return approval;

    if (data.action === ApprovalStatus.REJECTED) {
      workflow.status = WorkflowStatus.REJECTED;
      workflow.progress = WorkflowProgress.RETURNED;
      await this.workflowRepo.save(workflow);
    }
    else if (data.action === ApprovalStatus.APPROVED) {
      const allApprovals = await this.approvalRepo.findByWorkflowId(workflow.id);
      const pendingCount = allApprovals.filter(a => a.status === ApprovalStatus.PENDING).length;

      if (pendingCount === 0) {
        workflow.status = WorkflowStatus.APPROVED;
        workflow.progress = WorkflowProgress.FINISHED;
        await this.workflowRepo.save(workflow);
      }
    }

    return approval;
  }
}
