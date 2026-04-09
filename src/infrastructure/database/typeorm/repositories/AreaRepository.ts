import { Repository } from "typeorm";
import { AreaSchema } from "../schemas/AreaSchema";
import { AppDataSource } from "../data-source";
import { Area } from "@/domain/entities/Area";
import { IAreaRepository } from "@/domain/repositories/IAreaRepository";
import { AreaMapper } from "../mappers/AreaMapper";

export class AreaRepository implements IAreaRepository {
  private ormRepository: Repository<AreaSchema>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(AreaSchema);
  }

  async save(area: Area): Promise<Area> {
    const persistenceData = AreaMapper.toPersistence(area);
    const savedSchema = await this.ormRepository.save(persistenceData);

    return AreaMapper.toDomain(savedSchema as AreaSchema);
  }

  async findAll(): Promise<Area[]> {
    const schemas = await this.ormRepository.find();
    return schemas.map(AreaMapper.toDomain);
  }

  async findById(id: string): Promise<Area | null> {
    const schema = await this.ormRepository.findOne({ where: { id } });
    if (!schema) return null;

    return AreaMapper.toDomain(schema);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
