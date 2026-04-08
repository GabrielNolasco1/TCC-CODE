import { ISectionRepository } from "@/domain/repositories/ISectionRepository";
import { ISolicitationRepository } from "@/domain/repositories/ISolicitationRepository";
import { IInputRepository } from "@/domain/repositories/IInputRepository";
import { SectionStatus } from "@/domain/entities/Section";
import { AccessRole } from "@/domain/entities/User";

export class DeleteSectionUseCase {
  constructor(
    private sectionRepository: ISectionRepository,
    private solicitationRepository: ISolicitationRepository,
    private inputRepository: IInputRepository
  ) {}

  async execute(id: string, requester: any): Promise<void> {
    const section = await this.sectionRepository.findById(id);
    if (!section) throw new Error("Section not found.");

    const solicitation = await this.solicitationRepository.findById(section.solicitationId);

    if (requester.access === AccessRole.ADMIN && requester.areaId !== solicitation?.areaId) {
      throw new Error("Access denied.");
    }

    section.cleanDelete = SectionStatus.INACTIVE;
    await this.sectionRepository.save(section);

    // Cascata: Inativa os inputs vinculados
    await this.inputRepository.inactivateBySectionId(id);
  }
}
