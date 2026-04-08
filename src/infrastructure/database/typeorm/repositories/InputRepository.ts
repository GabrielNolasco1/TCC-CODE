import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { InputSchema } from "../schemas/InputSchema";
import { IInputRepository } from "@/domain/repositories/IInputRepository";
import { Input, InputStatus } from "@/domain/entities/Input";
import { InputMapper } from "../mappers/InputMapper";

export class InputRepository implements IInputRepository {
  private repository: Repository<InputSchema>;

  constructor() {
    this.repository = AppDataSource.getRepository(InputSchema);
  }

  async save(input: Input): Promise<Input> {
    const data = InputMapper.toPersistence(input);
    const saved = await this.repository.save(data);
    return InputMapper.toDomain(saved as InputSchema);
  }

  async findById(id: string): Promise<Input | null> {
    const schema = await this.repository.findOne({ where: { id } });
    return schema ? InputMapper.toDomain(schema) : null;
  }

  async findBySectionId(sectionId: string): Promise<Input[]> {
    const schemas = await this.repository.find({
      where: { sectionId, cleanDelete: InputStatus.ACTIVE },
      order: { order: "ASC" }
    });
    return schemas.map(InputMapper.toDomain);
  }

  async inactivateBySectionId(sectionId: string): Promise<void> {
    await this.repository.update({ sectionId }, { cleanDelete: InputStatus.INACTIVE });
  }
}
