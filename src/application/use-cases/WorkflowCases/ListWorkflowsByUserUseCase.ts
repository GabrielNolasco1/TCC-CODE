import { IWorkflowRepository } from "@/domain/repositories/IWorkflowRepository";

export class ListWorkflowsByUserUseCase {
  constructor(private workflowRepo: IWorkflowRepository) {}

  async execute(userId: string) {
    return await this.workflowRepo.findByCreatorId(userId);
  }
}
