import { IAreaRepository } from "@/domain/repositories/IAreaRepository";

export class UpdateAreaUseCase {
  constructor(private areaRepository: IAreaRepository) {}

  async execute(id: string, name: string) {
    const area = await this.areaRepository.findById(id);
    if (!area) throw new Error("Area not found");

    area.name = name;
    return await this.areaRepository.save(area);
  }
}