import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { ApprovalFlowSchema } from "../schemas/ApprovalFlowSchema";
import { IApprovalFlowRepository } from "@/domain/repositories/IApprovalFlowRepository";
import { ApprovalFlow } from "@/domain/entities/ApprovalFlow";
import { ApprovalFlowMapper } from "../mappers/ApprovalFlowMapper";

export class ApprovalFlowRepository implements IApprovalFlowRepository {
  private repository: Repository<ApprovalFlowSchema>;

  constructor() {
    this.repository = AppDataSource.getRepository(ApprovalFlowSchema);
  }

  async saveMany(flows: ApprovalFlow[]): Promise<ApprovalFlow[]> {
    const data = flows.map(f => ApprovalFlowMapper.toPersistence(f));
    const saved = await this.repository.save(data);
    return saved.map(s => ApprovalFlowMapper.toDomain(s as ApprovalFlowSchema));
  }

  async findBySolicitationId(solicitationId: string): Promise<ApprovalFlow[]> {
    const schemas = await this.repository.find({
      where: { solicitationId },
      order: { order: "ASC" }
    });
    return schemas.map(ApprovalFlowMapper.toDomain);
  }

  async deleteBySolicitationId(solicitationId: string): Promise<void> {
    await this.repository.delete({ solicitationId });
  }
}
