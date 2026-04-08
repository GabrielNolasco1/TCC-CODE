import { Repository } from "typeorm";
import { SolicitationSchema } from "../schemas/SolicitationSchema";
import { AppDataSource } from "../data-source";
import { ISolicitationRepository } from "@/domain/repositories/ISolicitationRepository";
import { Solicitation } from "@/domain/entities/Solicitation";
import { SolicitationMapper } from "../mappers/SolicitationMapper";

export class SolicitationRepository implements ISolicitationRepository {
  private repository: Repository<SolicitationSchema>;

  constructor() {
    this.repository = AppDataSource.getRepository(SolicitationSchema);
  }

  async save(solicitation: Solicitation): Promise<Solicitation> {
    const persistenceData = SolicitationMapper.toPersistence(solicitation);
    const saved = await this.repository.save(persistenceData);
    return SolicitationMapper.toDomain(saved);
  }

  async findByAreaId(areaId: string): Promise<Solicitation[]> {
    const schemas = await this.repository.find({ where: { areaId } });
    return schemas.map(SolicitationMapper.toDomain);
  }

  async findById(id: string): Promise<Solicitation | null> {
    const schema = await this.repository.findOne({ where: { id } });
    return schema ? SolicitationMapper.toDomain(schema) : null;
  }

  async findAll(): Promise<Solicitation[]> {
    const schemas = await this.repository.find();
    return schemas.map(SolicitationMapper.toDomain);
  }
}
