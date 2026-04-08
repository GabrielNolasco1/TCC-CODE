import { ApprovalConfig, FallbackAction } from "@/domain/entities/ApprovalConfig";
import { IApprovalConfigRepository } from "@/domain/repositories/IApprovalConfigRepository";
import { ISolicitationRepository } from "@/domain/repositories/ISolicitationRepository";
import { AccessRole } from "@/domain/entities/User";

export type SetApprovalConfigDTO = {
  solicitationId: string;
  necessaryApproverLevel?: number | null;
  ifNotHaveApproverLevel?: FallbackAction | null;
};

export class SetApprovalConfigUseCase {
  constructor(
    private configRepo: IApprovalConfigRepository,
    private solicitationRepo: ISolicitationRepository
  ) {}

  async execute(data: SetApprovalConfigDTO, requester: any): Promise<ApprovalConfig> {
    const solicitation = await this.solicitationRepo.findById(data.solicitationId);
    if (!solicitation) throw new Error("Solicitation not found.");

    if (requester.access === AccessRole.ADMIN && requester.areaId !== solicitation.areaId) {
      throw new Error("Access denied. You can only configure solicitations from your area.");
    }

    let config = await this.configRepo.findBySolicitationId(data.solicitationId);

    if (config) {
      config.necessaryApproverLevel = data.necessaryApproverLevel ?? null;
      config.ifNotHaveApproverLevel = data.ifNotHaveApproverLevel ?? null;
    } else {
      config = new ApprovalConfig({
        solicitationId: data.solicitationId,
        necessaryApproverLevel: data.necessaryApproverLevel,
        ifNotHaveApproverLevel: data.ifNotHaveApproverLevel
      });
    }

    return await this.configRepo.save(config);
  }
}
