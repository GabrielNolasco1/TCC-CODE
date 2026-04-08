import { IWorkflowRepository } from "@/domain/repositories/IWorkflowRepository";
import { IAnswerRepository } from "@/domain/repositories/IAnswerRepository";
import { IInputRepository } from "@/domain/repositories/IInputRepository";
import { IApprovalRepository } from "@/domain/repositories/IApprovalRepository";

export class GetWorkflowDetailUseCase {
  constructor(
    private workflowRepo: IWorkflowRepository,
    private answerRepo: IAnswerRepository,
    private inputRepo: IInputRepository,
    private approvalRepo: IApprovalRepository
  ) {}

  async execute(workflowId: string) {
    const workflow = await this.workflowRepo.findById(workflowId);
    if (!workflow) throw new Error("Workflow not found.");

    const answers = await this.answerRepo.findByWorkflowId(workflowId);
    const detailedAnswers = await Promise.all(
      answers.map(async (ans) => {
        const input = await this.inputRepo.findById(ans.inputId);
        return {
          id: ans.id,
          question: input?.question || "Pergunta removida",
          value: ans.value
        };
      })
    );

    const approvals = await this.approvalRepo.findByWorkflowIdWithApprover(workflowId);

    return {
      ...workflow,
      answers: detailedAnswers,
      approvals: approvals
    };
  }
}
