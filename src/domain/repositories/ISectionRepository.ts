import { Section } from "../entities/Section";

export interface ISectionRepository {
  findById(id: string): Promise<Section | null>;
  findBySolicitationId(solicitationId: string): Promise<Section[]>;
  save(section: Section): Promise<Section>;
}
