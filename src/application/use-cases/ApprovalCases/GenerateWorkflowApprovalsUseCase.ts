import { IApprovalRepository } from "@/domain/repositories/IApprovalRepository";
import { IApprovalConfigRepository } from "@/domain/repositories/IApprovalConfigRepository";
import { IApprovalFlowRepository } from "@/domain/repositories/IApprovalFlowRepository";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { Approval } from "@/domain/entities/Approval";
import { ApprovalStatus } from "@/domain/entities/Approval";

export class GenerateWorkflowApprovalsUseCase {
  constructor(
    private approvalRepo: IApprovalRepository,
    private configRepo: IApprovalConfigRepository,
    private flowRepo: IApprovalFlowRepository,
    private userRepo: IUserRepository
  ) {}

  async execute(workflowId: string, solicitationId: string, requesterId: string, areaId: string) {
    const approvalsToSave: Approval[] = [];
    let currentOrder = 1;

    // Busca a configuração definida pelo usuário para esta solicitação
    const config = await this.configRepo.findBySolicitationId(solicitationId);

    if (config && config.necessaryApproverLevel) {
      const approver = await this.userRepo.findApproverByLevel(areaId, config.necessaryApproverLevel);

      if (approver) {
        if (approver.id !== requesterId) {
          approvalsToSave.push(new Approval({
            workflowId,
            approverId: approver.id,
            order: currentOrder++,
            status: ApprovalStatus.PENDING
          }));
        } else {
          console.log(`[Flow] Pulando nível ${config.necessaryApproverLevel}: O criador já possui este nível.`);
        }
      }
    }

    const fixedFlows = await this.flowRepo.findBySolicitationId(solicitationId);

    for (const flow of fixedFlows) {
      if (flow.userId !== requesterId) {
        approvalsToSave.push(new Approval({
          workflowId,
          approverId: flow.userId,
          order: currentOrder++,
          status: ApprovalStatus.PENDING
        }));
      } else {
        console.log(`[Flow] Removendo ${flow.userId} da fila fixa: Usuário é o solicitante.`);
      }
    }

    if (approvalsToSave.length > 0) {
      await this.approvalRepo.saveMany(approvalsToSave);
    }
  }
}
