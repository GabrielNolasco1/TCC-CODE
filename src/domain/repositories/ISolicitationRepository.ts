import { Solicitation } from "../entities/Solicitation";

export interface ISolicitationRepository {
  findById(id: string): Promise<Solicitation | null>;
  findAll(): Promise<Solicitation[]>;
  findByAreaId(areaId: string): Promise<Solicitation[]>;
  save(solicitation: Solicitation): Promise<Solicitation>;
}
