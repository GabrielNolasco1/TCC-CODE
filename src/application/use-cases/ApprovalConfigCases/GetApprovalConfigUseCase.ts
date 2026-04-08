import { IApprovalConfigRepository } from "@/domain/repositories/IApprovalConfigRepository";

export class GetApprovalConfigUseCase {
  constructor(private configRepo: IApprovalConfigRepository) {}

  async execute(solicitationId: string) {
    const config = await this.configRepo.findBySolicitationId(solicitationId);
    return config || null;
  }
}
