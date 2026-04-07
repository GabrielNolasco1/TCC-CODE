import { Area } from "../entities/Area";

export interface IAreaRepository {
  findById(id: string): Promise<Area | null>;
  findAll(): Promise<Area[]>;
  save(area: Area): Promise<Area>;
  delete(id: string): Promise<void>;
}