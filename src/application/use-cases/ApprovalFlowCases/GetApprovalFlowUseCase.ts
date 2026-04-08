import { IApprovalFlowRepository } from "@/domain/repositories/IApprovalFlowRepository";

export class GetApprovalFlowUseCase {
  constructor(private flowRepo: IApprovalFlowRepository) {}

  async execute(solicitationId: string) {
    const flows = await this.flowRepo.findBySolicitationId(solicitationId);
    return flows || [];
  }
}
