import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { WorkflowSchema } from "../schemas/WorkflowSchema";
import { Workflow } from "@/domain/entities/Workflow";
import { IWorkflowRepository } from "@/domain/repositories/IWorkflowRepository";
import { WorkflowMapper } from "../mappers/WorkflowMapper"; // Usando seu mapper

export class WorkflowRepository implements IWorkflowRepository {
  private ormRepository: Repository<WorkflowSchema>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(WorkflowSchema);
  }

  async findByCreatorId(creatorId: string): Promise<Workflow[]> {
    const schemas = await this.ormRepository.find({
      where: { creatorId },
      order: { createdAt: "DESC" }
    });

    return schemas.map(schema => WorkflowMapper.toDomain(schema));
  }

  async findById(id: string): Promise<Workflow | null> {
    const schema = await this.ormRepository.findOne({ where: { id } });
    if (!schema) return null;
    return WorkflowMapper.toDomain(schema);
  }

  async save(workflow: Workflow): Promise<Workflow> {
    const data = WorkflowMapper.toPersistence(workflow);
    const schema = this.ormRepository.create(data);
    const saved = await this.ormRepository.save(schema);
    return WorkflowMapper.toDomain(saved);
  }

  async findAllWithDetails(): Promise<Workflow[]> {
    const schemas = await this.ormRepository.find({
      order: { createdAt: "DESC" }
    });
    return schemas.map(schema => WorkflowMapper.toDomain(schema));
  }
}
