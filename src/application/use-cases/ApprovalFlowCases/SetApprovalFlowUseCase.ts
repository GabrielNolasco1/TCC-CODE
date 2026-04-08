import { ApprovalFlow } from "@/domain/entities/ApprovalFlow";
import { IApprovalFlowRepository } from "@/domain/repositories/IApprovalFlowRepository";
import { ISolicitationRepository } from "@/domain/repositories/ISolicitationRepository";
import { AccessRole } from "@/domain/entities/User";

export type FlowDTO = {
  userId: string;
  order: number;
};

export type SetApprovalFlowDTO = {
  solicitationId: string;
  flows: FlowDTO[];
};

export class SetApprovalFlowUseCase {
  constructor(
    private flowRepo: IApprovalFlowRepository,
    private solicitationRepo: ISolicitationRepository
  ) {}

  async execute(data: SetApprovalFlowDTO, requester: any): Promise<ApprovalFlow[]> {
    const solicitation = await this.solicitationRepo.findById(data.solicitationId);
    if (!solicitation) throw new Error("Solicitation not found.");

    if (requester.access === AccessRole.ADMIN && requester.areaId !== solicitation.areaId) {
      throw new Error("Access denied. You can only configure flows from your area.");
    }

    await this.flowRepo.deleteBySolicitationId(data.solicitationId);

    const newFlows = data.flows.map(f => new ApprovalFlow({
      solicitationId: data.solicitationId,
      userId: f.userId,
      order: f.order
    }));

    if (newFlows.length > 0) {
      return await this.flowRepo.saveMany(newFlows);
    }

    return [];
  }
}
