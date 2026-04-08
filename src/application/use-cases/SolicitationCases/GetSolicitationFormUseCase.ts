import { ISectionRepository } from "@/domain/repositories/ISectionRepository";
import { IInputRepository } from "@/domain/repositories/IInputRepository";

export class GetSolicitationFormUseCase {
  constructor(
    private sectionRepository: ISectionRepository,
    private inputRepository: IInputRepository
  ) {}

  async execute(solicitationId: string) {
    // 1. Busca todas as seções atreladas a essa solicitação
    const sections = await this.sectionRepository.findBySolicitationId(solicitationId);

    // 2. Para cada seção, busca os inputs e monta o objeto
    const sectionsWithInputs = await Promise.all(
      sections.map(async (section) => {
        const inputs = await this.inputRepository.findBySectionId(section.id);

        // Ordena os inputs pela propriedade 'order'
        const sortedInputs = inputs.sort((a, b) => a.order - b.order);

        return {
          id: section.id,
          name: section.title,
          order: section.order,
          inputs: sortedInputs
        };
      })
    );

    // 3. Ordena as seções pela propriedade 'order'
    const sortedSections = sectionsWithInputs.sort((a, b) => a.order - b.order);

    // Retorna no formato exato que o Front-end está esperando
    return { sections: sortedSections };
  }
}
