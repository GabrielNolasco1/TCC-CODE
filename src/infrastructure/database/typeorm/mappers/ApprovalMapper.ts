import { Approval } from "@/domain/entities/Approval";
import { ApprovalSchema } from "../schemas/ApprovalSchema";

export class ApprovalMapper {
  static toDomain(schema: ApprovalSchema): Approval {
    return new Approval({
      id: schema.id,
      workflowId: schema.workflowId,
      approverId: schema.approverId,
      status: schema.status,
      order: schema.order,
      comments: schema.comments,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt
    });
  }

  static toPersistence(approval: Approval): Partial<ApprovalSchema> {
    return {
      id: approval.id,
      workflowId: approval.workflowId,
      approverId: approval.approverId,
      status: approval.status,
      order: approval.order,
      comments: approval.comments,
      createdAt: approval.createdAt,
      updatedAt: approval.updatedAt
    };
  }
}
