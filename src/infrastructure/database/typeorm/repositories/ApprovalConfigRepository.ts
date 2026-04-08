import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { ApprovalConfigSchema } from "../schemas/ApprovalConfigSchema";
import { IApprovalConfigRepository } from "@/domain/repositories/IApprovalConfigRepository";
import { ApprovalConfig } from "@/domain/entities/ApprovalConfig";
import { ApprovalConfigMapper } from "../mappers/ApprovalConfigMapper";

export class ApprovalConfigRepository implements IApprovalConfigRepository {
  private repository: Repository<ApprovalConfigSchema>;

  constructor() {
    this.repository = AppDataSource.getRepository(ApprovalConfigSchema);
  }

  async save(config: ApprovalConfig): Promise<ApprovalConfig> {
    const data = ApprovalConfigMapper.toPersistence(config);
    const saved = await this.repository.save(data);
    return ApprovalConfigMapper.toDomain(saved as ApprovalConfigSchema);
  }

  async findBySolicitationId(solicitationId: string): Promise<ApprovalConfig | null> {
    const schema = await this.repository.findOne({ where: { solicitationId } });
    return schema ? ApprovalConfigMapper.toDomain(schema) : null;
  }
}
