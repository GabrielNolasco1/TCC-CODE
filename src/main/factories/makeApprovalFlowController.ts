import { ApprovalFlowRepository } from "@/infrastructure/database/typeorm/repositories/ApprovalFlowRepository";
import { SolicitationRepository } from "@/infrastructure/database/typeorm/repositories/SolicitationRepository";
import { SetApprovalFlowUseCase } from "@/application/use-cases/ApprovalFlowCases/SetApprovalFlowUseCase";
import { ApprovalFlowController } from "@/presentation/controllers/ApprovalFlowController";
import { GetApprovalFlowUseCase } from "@/application/use-cases/ApprovalFlowCases/GetApprovalFlowUseCase";

export const makeApprovalFlowController = (): ApprovalFlowController => {
  const flowRepo = new ApprovalFlowRepository();
  const solicitationRepo = new SolicitationRepository();

  const setApprovalFlowUseCase = new SetApprovalFlowUseCase(flowRepo, solicitationRepo);
  const getUseCase = new GetApprovalFlowUseCase(flowRepo);

  return new ApprovalFlowController(setApprovalFlowUseCase, getUseCase);
};
