import { Repository } from "typeorm";
import { SectionSchema } from "../schemas/SectionSchema";
import { AppDataSource } from "../data-source";
import { ISectionRepository } from "@/domain/repositories/ISectionRepository";
import { Section, SectionStatus } from "@/domain/entities/Section";
import { SectionMapper } from "../mappers/SectionMapper";

export class SectionRepository implements ISectionRepository {
  private repository: Repository<SectionSchema>;

  constructor() {
    this.repository = AppDataSource.getRepository(SectionSchema);
  }

  async save(section: Section): Promise<Section> {
    const data = SectionMapper.toPersistence(section);
    const saved = await this.repository.save(data);
    return SectionMapper.toDomain(saved as SectionSchema);
  }

  async findById(id: string): Promise<Section | null> {
    const schema = await this.repository.findOne({ where: { id } });
    return schema ? SectionMapper.toDomain(schema) : null;
  }

  async findBySolicitationId(solicitationId: string): Promise<Section[]> {
    const schemas = await this.repository.find({
      where: { solicitationId, cleanDelete: SectionStatus.ACTIVE },
      order: { order: "ASC" }
    });
    return schemas.map(SectionMapper.toDomain);
  }
}
