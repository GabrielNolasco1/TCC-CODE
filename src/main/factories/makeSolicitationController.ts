import { SolicitationRepository } from "@/infrastructure/database/typeorm/repositories/SolicitationRepository";
import { SectionRepository } from "@/infrastructure/database/typeorm/repositories/SectionRepository"; // <-- Adicionado
import { InputRepository } from "@/infrastructure/database/typeorm/repositories/InputRepository";     // <-- Adicionado

import { SolicitationController } from "@/presentation/controllers/SolicitationController";
import { CreateSolicitationUseCase } from "@/application/use-cases/SolicitationCases/CreateSolicitationUseCase";
import { ListSolicitationsUseCase } from "@/application/use-cases/SolicitationCases/ListSolicitationsUseCase";
import { UpdateSolicitationUseCase } from "@/application/use-cases/SolicitationCases/UpdateSolicitationUseCase";
import { DeleteSolicitationUseCase } from "@/application/use-cases/SolicitationCases/DeleteSolicitationUseCase";
import { GetSolicitationFormUseCase } from "@/application/use-cases/SolicitationCases/GetSolicitationFormUseCase"; // <-- Adicionado

export const makeSolicitationController = (): SolicitationController => {
  const solicitationRepo = new SolicitationRepository();
  const sectionRepo = new SectionRepository();
  const inputRepo = new InputRepository();

  const createUseCase = new CreateSolicitationUseCase(solicitationRepo);
  const listUseCase = new ListSolicitationsUseCase(solicitationRepo);
  const updateUseCase = new UpdateSolicitationUseCase(solicitationRepo);
  const deleteUseCase = new DeleteSolicitationUseCase(solicitationRepo);

  const getFormUseCase = new GetSolicitationFormUseCase(sectionRepo, inputRepo);

  return new SolicitationController(
    createUseCase,
    listUseCase,
    updateUseCase,
    deleteUseCase,
    getFormUseCase
  );
};
