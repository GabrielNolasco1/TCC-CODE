import { ApprovalConfig } from "@/domain/entities/ApprovalConfig";
import { ApprovalConfigSchema } from "../schemas/ApprovalConfigSchema";

export class ApprovalConfigMapper {
  static toDomain(schema: ApprovalConfigSchema): ApprovalConfig {
    return new ApprovalConfig({
      id: schema.id,
      solicitationId: schema.solicitationId,
      necessaryApproverLevel: schema.necessaryApproverLevel,
      ifNotHaveApproverLevel: schema.ifNotHaveApproverLevel,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt
    });
  }

  static toPersistence(config: ApprovalConfig): Partial<ApprovalConfigSchema> {
    return {
      id: config.id,
      solicitationId: config.solicitationId,
      necessaryApproverLevel: config.necessaryApproverLevel,
      ifNotHaveApproverLevel: config.ifNotHaveApproverLevel,
      createdAt: config.createdAt,
      updatedAt: config.updatedAt
    };
  }
}
