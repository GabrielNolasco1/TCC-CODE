import { Area } from "@/domain/entities/Area";
import { AreaSchema } from "../schemas/AreaSchema";

export class AreaMapper {
  static toDomain(schema: AreaSchema): Area {
    return new Area({
      id: schema.id,
      name: schema.name,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt
    });
  }

  static toPersistence(area: Area): Partial<AreaSchema> {
    return {
      id: area.id,
      name: area.name,
      createdAt: area.createdAt,
      updatedAt: area.updatedAt
    };
  }
}