import { Area } from "@/domain/entities/Area";
import { IAreaRepository } from "@/domain/repositories/IAreaRepository";

export class CreateAreaUseCase {
  constructor(private areaRepository: IAreaRepository) {}

  async execute(name: string): Promise<Area> {
    const area = new Area({ name });
    return await this.areaRepository.save(area);
  }
}