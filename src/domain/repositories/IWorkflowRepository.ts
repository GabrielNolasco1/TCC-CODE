import { Workflow } from "../entities/Workflow";

export interface IWorkflowRepository {
  findById(id: string): Promise<Workflow | null>;
  findByCreatorId(creatorId: string): Promise<Workflow[]>;
  findAllWithDetails(): Promise<Workflow[]>;
  save(workflow: Workflow): Promise<Workflow>;
}
