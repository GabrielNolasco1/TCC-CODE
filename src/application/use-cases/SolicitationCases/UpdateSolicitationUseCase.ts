import { ISolicitationRepository } from "@/domain/repositories/ISolicitationRepository";
import { AccessRole } from "@/domain/entities/User";

export class UpdateSolicitationUseCase {
  constructor(private solicitationRepository: ISolicitationRepository) {}

  async execute(id: string, name: string, requester: any) {
    const solicitation = await this.solicitationRepository.findById(id);
    if (!solicitation) throw new Error("Solicitation not found");

    if (requester.access === AccessRole.ADMIN && requester.areaId !== solicitation.areaId) {
      throw new Error("Admins can only update solicitations from their own area.");
    }

    solicitation.name = name;
    return await this.solicitationRepository.save(solicitation);
  }
}
