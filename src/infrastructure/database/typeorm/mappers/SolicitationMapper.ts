import { Solicitation } from "@/domain/entities/Solicitation";
import { SolicitationSchema } from "../schemas/SolicitationSchema";

export class SolicitationMapper {
  static toDomain(schema: SolicitationSchema): Solicitation {
    return new Solicitation({
      id: schema.id,
      areaId: schema.areaId,
      name: schema.name,
      cleanDelete: schema.cleanDelete,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt
    });
  }

  static toPersistence(solicitation: Solicitation): Partial<SolicitationSchema> {
    return {
      id: solicitation.id,
      areaId: solicitation.areaId,
      name: solicitation.name,
      cleanDelete: solicitation.cleanDelete,
      createdAt: solicitation.createdAt,
      updatedAt: solicitation.updatedAt
    };
  }
}
