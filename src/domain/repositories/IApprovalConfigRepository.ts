import { ApprovalConfig } from "../entities/ApprovalConfig";

export interface IApprovalConfigRepository {
  findBySolicitationId(solicitationId: string): Promise<ApprovalConfig | null>;
  save(config: ApprovalConfig): Promise<ApprovalConfig>;
}
