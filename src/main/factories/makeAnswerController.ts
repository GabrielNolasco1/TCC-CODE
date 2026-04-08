import { AnswerRepository } from "@/infrastructure/database/typeorm/repositories/AnswerRepository";
import { InputRepository } from "@/infrastructure/database/typeorm/repositories/InputRepository";
import { CreateAnswerUseCase } from "@/application/use-cases/AnswerCases/CreateAnswerUseCase";
import { AnswerController } from "@/presentation/controllers/AnswerController";

export const makeAnswerController = (): AnswerController => {
  const answerRepo = new AnswerRepository();
  const inputRepo = new InputRepository();

  const createAnswerUseCase = new CreateAnswerUseCase(answerRepo, inputRepo);

  return new AnswerController(createAnswerUseCase);
};
