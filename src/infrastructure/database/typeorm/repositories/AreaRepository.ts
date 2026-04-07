import { Repository } from "typeorm";
import { AreaSchema } from "../schemas/AreaSchema";
import { AppDataSource } from "../data-source";
import { Area } from "@/domain/entities/Area";
import { IAreaRepository } from "@/domain/repositories/IAreaRepository";

export class AreaRepository implements IAreaRepository {
  private ormRepository: Repository<AreaSchema>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(AreaSchema);
  }

  async save(area: Area): Promise<Area> {
    const schema = this.ormRepository.create(area);
    const savedSchema = await this.ormRepository.save(schema);
    
    return new Area(savedSchema);
  }

  async findAll(): Promise<Area[]> {
    const schemas = await this.ormRepository.find();
    return schemas.map(schema => new Area(schema));
  }

  async findById(id: string): Promise<Area | null> {
    const schema = await this.ormRepository.findOne({ where: { id } });
    if (!schema) return null;
    return new Area(schema);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}