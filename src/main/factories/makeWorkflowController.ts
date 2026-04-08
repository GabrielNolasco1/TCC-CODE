import { WorkflowRepository } from "@/infrastructure/database/typeorm/repositories/WorkflowRepository";
import { AnswerRepository } from "@/infrastructure/database/typeorm/repositories/AnswerRepository";
import { InputRepository } from "@/infrastructure/database/typeorm/repositories/InputRepository";
import { SolicitationRepository } from "@/infrastructure/database/typeorm/repositories/SolicitationRepository";
import { ApprovalRepository } from "@/infrastructure/database/typeorm/repositories/ApprovalRepository";
import { ApprovalConfigRepository } from "@/infrastructure/database/typeorm/repositories/ApprovalConfigRepository";
import { ApprovalFlowRepository } from "@/infrastructure/database/typeorm/repositories/ApprovalFlowRepository";
import { UserRepository } from "@/infrastructure/database/typeorm/repositories/UserRepository";

import { WorkflowController } from "@/presentation/controllers/WorkflowController";
import { CreateWorkflowUseCase } from "@/application/use-cases/WorkflowCases/CreateWorkflowUseCase";
import { ListWorkflowsByUserUseCase } from "@/application/use-cases/WorkflowCases/ListWorkflowsByUserUseCase";
import { GetWorkflowDetailUseCase } from "@/application/use-cases/WorkflowCases/GetWorkflowDetailUseCase";
import { GenerateWorkflowApprovalsUseCase } from "@/application/use-cases/ApprovalCases/GenerateWorkflowApprovalsUseCase";

export const makeWorkflowController = (): WorkflowController => {
  const workflowRepo = new WorkflowRepository();
  const answerRepo = new AnswerRepository();
  const inputRepo = new InputRepository();
  const solicitationRepo = new SolicitationRepository();
  const approvalRepo = new ApprovalRepository();
  const configRepo = new ApprovalConfigRepository();
  const flowRepo = new ApprovalFlowRepository();
  const userRepo = new UserRepository();

  const generateApprovals = new GenerateWorkflowApprovalsUseCase(
    approvalRepo, configRepo, flowRepo, userRepo
  );

  const createUseCase = new CreateWorkflowUseCase(
    workflowRepo, answerRepo, inputRepo, solicitationRepo, generateApprovals
  );

  const listByUserUseCase = new ListWorkflowsByUserUseCase(workflowRepo);

  const getDetailUseCase = new GetWorkflowDetailUseCase(
    workflowRepo, answerRepo, inputRepo, approvalRepo
  );

  return new WorkflowController(
    createUseCase,
    listByUserUseCase,
    getDetailUseCase
  );
};
