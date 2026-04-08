import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AnswerSchema } from "../schemas/AnswerSchema";
import { IAnswerRepository } from "@/domain/repositories/IAnswerRepository";
import { Answer } from "@/domain/entities/Answer";
import { AnswerMapper } from "../mappers/AnswerMapper";

export class AnswerRepository implements IAnswerRepository {
  private repository: Repository<AnswerSchema>;

  constructor() {
    this.repository = AppDataSource.getRepository(AnswerSchema);
  }

  async save(answer: Answer): Promise<Answer> {
    const data = AnswerMapper.toPersistence(answer);
    const saved = await this.repository.save(data);
    return AnswerMapper.toDomain(saved as AnswerSchema);
  }

  async findByWorkflowId(workflowId: string): Promise<Answer[]> {
    const schemas = await this.repository.find({
      where: { workflowId },
      order: { order: "ASC" }
    });
    return schemas.map(AnswerMapper.toDomain);
  }

  async saveMany(answers: Answer[]): Promise<Answer[]> {
    const data = answers.map(a => AnswerMapper.toPersistence(a));
    const saved = await this.repository.save(data);
    return saved.map(s => AnswerMapper.toDomain(s as AnswerSchema));
  }
}
