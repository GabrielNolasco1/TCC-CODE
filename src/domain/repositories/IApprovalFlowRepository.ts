import { ApprovalFlow } from "../entities/ApprovalFlow";

export interface IApprovalFlowRepository {
  findBySolicitationId(solicitationId: string): Promise<ApprovalFlow[]>;
  saveMany(flows: ApprovalFlow[]): Promise<ApprovalFlow[]>;
  deleteBySolicitationId(solicitationId: string): Promise<void>;
}
