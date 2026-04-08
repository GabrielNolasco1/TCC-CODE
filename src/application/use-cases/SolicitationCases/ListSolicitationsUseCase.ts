import { ISolicitationRepository } from "@/domain/repositories/ISolicitationRepository";

export class ListSolicitationsUseCase {
  constructor(private solicitationRepository: ISolicitationRepository) {}

  async execute(user: { access: string; areaId: string | null }, onlyArea: boolean = false) {

    if (user.access === 'MASTER' || !onlyArea) {
      return await this.solicitationRepository.findAll();
    }

    if (!user.areaId) {
      return [];
    }

    return await this.solicitationRepository.findByAreaId(user.areaId);
  }
}
