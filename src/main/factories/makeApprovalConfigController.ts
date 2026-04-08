import { ApprovalConfigRepository } from "@/infrastructure/database/typeorm/repositories/ApprovalConfigRepository";
import { SolicitationRepository } from "@/infrastructure/database/typeorm/repositories/SolicitationRepository";
import { SetApprovalConfigUseCase } from "@/application/use-cases/ApprovalConfigCases/SetApprovalConfigUseCase";
import { ApprovalConfigController } from "@/presentation/controllers/ApprovalConfigController";
import { GetApprovalConfigUseCase } from "@/application/use-cases/ApprovalConfigCases/GetApprovalConfigUseCase";

export const makeApprovalConfigController = (): ApprovalConfigController => {
  const configRepo = new ApprovalConfigRepository();
  const solicitationRepo = new SolicitationRepository();

  const setApprovalConfigUseCase = new SetApprovalConfigUseCase(configRepo, solicitationRepo);
  const getUseCase = new GetApprovalConfigUseCase(configRepo);

  return new ApprovalConfigController(setApprovalConfigUseCase, getUseCase);
};
