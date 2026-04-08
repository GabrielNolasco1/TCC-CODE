import { Answer } from "../entities/Answer";

export interface IAnswerRepository {
  save(answer: Answer): Promise<Answer>;
  saveMany(answers: Answer[]): Promise<Answer[]>;
  findByWorkflowId(workflowId: string): Promise<Answer[]>;
}
