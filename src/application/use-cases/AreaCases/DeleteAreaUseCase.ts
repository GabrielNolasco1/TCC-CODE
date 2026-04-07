import { IAreaRepository } from "@/domain/repositories/IAreaRepository";

export class DeleteAreaUseCase {
  constructor(private areaRepository: IAreaRepository) {}

  async execute(id: string) {
    await this.areaRepository.delete(id);
  }
}