import { ApprovalFlow } from "@/domain/entities/ApprovalFlow";
import { ApprovalFlowSchema } from "../schemas/ApprovalFlowSchema";

export class ApprovalFlowMapper {
  static toDomain(schema: ApprovalFlowSchema): ApprovalFlow {
    return new ApprovalFlow({
      id: schema.id,
      solicitationId: schema.solicitationId,
      userId: schema.userId,
      order: schema.order,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt
    });
  }

  static toPersistence(flow: ApprovalFlow): Partial<ApprovalFlowSchema> {
    return {
      id: flow.id,
      solicitationId: flow.solicitationId,
      userId: flow.userId,
      order: flow.order,
      createdAt: flow.createdAt,
      updatedAt: flow.updatedAt
    };
  }
}
