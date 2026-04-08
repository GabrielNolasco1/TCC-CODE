import { Approval } from "../entities/Approval";

export interface IApprovalRepository {
  findById(id: string): Promise<Approval | null>;
  findByWorkflowId(workflowId: string): Promise<Approval[]>;
  findPendingByApproverId(approverId: string): Promise<Approval[]>;
  save(approval: Approval): Promise<Approval>;
  saveMany(approvals: Approval[]): Promise<Approval[]>;
  findByWorkflowIdWithApprover(workflowId: string): Promise<(Approval & { approverName: string })[]>;
}
