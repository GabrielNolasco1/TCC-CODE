import { Workflow } from "@/domain/entities/Workflow";
import { WorkflowSchema } from "../schemas/WorkflowSchema";

export class WorkflowMapper {
  static toDomain(schema: WorkflowSchema): Workflow {
    return new Workflow({
      id: schema.id,
      creatorId: schema.creatorId,
      solicitationId: schema.solicitationId,
      title: schema.title,
      progress: schema.progress,
      status: schema.status,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt
    });
  }

  static toPersistence(workflow: Workflow): Partial<WorkflowSchema> {
    return {
      id: workflow.id,
      creatorId: workflow.creatorId,
      solicitationId: workflow.solicitationId,
      title: workflow.title,
      progress: workflow.progress,
      status: workflow.status,
      createdAt: workflow.createdAt,
      updatedAt: workflow.updatedAt
    };
  }
}
