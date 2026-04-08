import { InputRepository } from "@/infrastructure/database/typeorm/repositories/InputRepository";
import { SectionRepository } from "@/infrastructure/database/typeorm/repositories/SectionRepository";
import { SolicitationRepository } from "@/infrastructure/database/typeorm/repositories/SolicitationRepository";
import { CreateInputUseCase } from "@/application/use-cases/InputCases/CreateInputUseCase";
import { InputController } from "@/presentation/controllers/InputController";

export const makeInputController = (): InputController => {
  const inputRepo = new InputRepository();
  const sectionRepo = new SectionRepository();
  const solicitationRepo = new SolicitationRepository();

  const createInputUseCase = new CreateInputUseCase(inputRepo, sectionRepo, solicitationRepo);

  return new InputController(createInputUseCase);
};
