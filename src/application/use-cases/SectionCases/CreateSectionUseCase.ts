import { Section } from "@/domain/entities/Section";
import { ISectionRepository } from "@/domain/repositories/ISectionRepository";
import { ISolicitationRepository } from "@/domain/repositories/ISolicitationRepository";
import { AccessRole } from "@/domain/entities/User";

export class CreateSectionUseCase {
  constructor(
    private sectionRepository: ISectionRepository,
    private solicitationRepository: ISolicitationRepository
  ) {}

  async execute(solicitationId: string, title: string, order: number, requester: any) {
    const solicitation = await this.solicitationRepository.findById(solicitationId);
    if (!solicitation) throw new Error("Solicitation not found.");

    if (requester.access === AccessRole.ADMIN && requester.areaId !== solicitation.areaId) {
      throw new Error("You don't have permission to add sections to this solicitation.");
    }

    const section = new Section({ solicitationId, title, order });
    return await this.sectionRepository.save(section);
  }
}
