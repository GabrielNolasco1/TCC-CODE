import { SectionRepository } from "@/infrastructure/database/typeorm/repositories/SectionRepository";
import { SolicitationRepository } from "@/infrastructure/database/typeorm/repositories/SolicitationRepository";
import { InputRepository } from "@/infrastructure/database/typeorm/repositories/InputRepository"; // IMPORTADO
import { SectionController } from "@/presentation/controllers/SectionController";
import { CreateSectionUseCase } from "@/application/use-cases/SectionCases/CreateSectionUseCase";
import { DeleteSectionUseCase } from "@/application/use-cases/SectionCases/DeleteSectionUseCase";

export const makeSectionController = (): SectionController => {
  const sectionRepo = new SectionRepository();
  const solicitationRepo = new SolicitationRepository();
  const inputRepo = new InputRepository();

  const createSection = new CreateSectionUseCase(sectionRepo, solicitationRepo);

  const deleteSection = new DeleteSectionUseCase(
    sectionRepo,
    solicitationRepo,
    inputRepo
  );

  return new SectionController(createSection, deleteSection);
};
