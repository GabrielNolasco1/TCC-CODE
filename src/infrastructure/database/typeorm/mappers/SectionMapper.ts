import { Section } from "@/domain/entities/Section";
import { SectionSchema } from "../schemas/SectionSchema";

export class SectionMapper {
  static toDomain(schema: SectionSchema): Section {
    return new Section({
      id: schema.id,
      solicitationId: schema.solicitationId,
      title: schema.title,
      order: schema.order,
      cleanDelete: schema.cleanDelete,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt
    });
  }

  static toPersistence(section: Section): Partial<SectionSchema> {
    return {
      id: section.id,
      solicitationId: section.solicitationId,
      title: section.title,
      order: section.order,
      cleanDelete: section.cleanDelete
    };
  }
}
