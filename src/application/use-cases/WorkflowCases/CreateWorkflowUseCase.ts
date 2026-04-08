import { Workflow, WorkflowProgress, WorkflowStatus } from "@/domain/entities/Workflow";
import { Answer } from "@/domain/entities/Answer";
import { IWorkflowRepository } from "@/domain/repositories/IWorkflowRepository";
import { IAnswerRepository } from "@/domain/repositories/IAnswerRepository";
import { IInputRepository } from "@/domain/repositories/IInputRepository";
import { ISolicitationRepository } from "@/domain/repositories/ISolicitationRepository";
import { FieldValidator } from "@/domain/utils/FieldValidator";
// 1. Importar o gerador
import { GenerateWorkflowApprovalsUseCase } from "../ApprovalCases/GenerateWorkflowApprovalsUseCase";

export type AnswerDTO = {
  inputId: string;
  value: string;
  order: number;
};

export type CreateWorkflowRequest = {
  solicitationId: string;
  title: string;
  answers: AnswerDTO[];
};

export class CreateWorkflowUseCase {
  constructor(
    private workflowRepo: IWorkflowRepository,
    private answerRepo: IAnswerRepository,
    private inputRepo: IInputRepository,
    private solicitationRepo: ISolicitationRepository,
    private generateApprovalsUseCase: GenerateWorkflowApprovalsUseCase
  ) {}

  async execute(data: CreateWorkflowRequest, requester: { id: string; access: string; areaId: string | null }): Promise<Workflow> {
    const solicitation = await this.solicitationRepo.findById(data.solicitationId);
    if (!solicitation) throw new Error("Solicitation not found.");

    const workflow = new Workflow({
      creatorId: requester.id,
      solicitationId: data.solicitationId,
      title: data.title,
      progress: WorkflowProgress.IN_PROGRESS,
      status: WorkflowStatus.PENDING
    });

    const answersToSave: Answer[] = [];

    for (const answerDto of data.answers) {
      const input = await this.inputRepo.findById(answerDto.inputId);
      if (!input) throw new Error(`Input ${answerDto.inputId} not found.`);

      if (input.isRequired && (!answerDto.value || answerDto.value.trim() === "")) {
        throw new Error(`The field "${input.question}" is required.`);
      }

      if (answerDto.value && !FieldValidator.isValid(input.type, answerDto.value)) {
        throw new Error(`Invalid format for field "${input.question}".`);
      }

      if (["select", "radio"].includes(input.type) && input.options) {
        if (!input.options.includes(answerDto.value)) {
          throw new Error(`Invalid option for field "${input.question}".`);
        }
      }

      answersToSave.push(new Answer({
        workflowId: workflow.id,
        inputId: input.id,
        sectionId: input.sectionId,
        value: answerDto.value,
        order: answerDto.order
      }));
    }

    const savedWorkflow = await this.workflowRepo.save(workflow);
    await this.answerRepo.saveMany(answersToSave);

    await this.generateApprovalsUseCase.execute(
      savedWorkflow.id,
      data.solicitationId,
      requester.id,
      requester.areaId || ""
    );

    return savedWorkflow;
  }
}
