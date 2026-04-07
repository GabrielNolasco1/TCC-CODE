import { IAreaRepository } from "@/domain/repositories/IAreaRepository";

export class ListAreasUseCase {
  constructor(private areaRepository: IAreaRepository) {}

  async execute() {
    return await this.areaRepository.findAll();
  }
}