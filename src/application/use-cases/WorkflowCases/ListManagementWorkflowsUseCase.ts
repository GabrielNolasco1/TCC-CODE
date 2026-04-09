import { IWorkflowRepository } from "@/domain/repositories/IWorkflowRepository";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { ISolicitationRepository } from "@/domain/repositories/ISolicitationRepository";
import { IAreaRepository } from "@/domain/repositories/IAreaRepository";

export class ListManagementWorkflowsUseCase {
  constructor(
    private workflowRepo: IWorkflowRepository,
    private userRepo: IUserRepository,
    private solicitationRepo: ISolicitationRepository,
    private areaRepo: IAreaRepository
  ) {}

  async execute(requester: { access: string; areaId: string | null }) {
    const workflows = await this.workflowRepo.findAllWithDetails();
    const result = [];

    for (const wf of workflows) {
      const solicitation = await this.solicitationRepo.findById(wf.solicitationId);
      if (!solicitation) continue;

      if (requester.access === 'ADMIN' && solicitation.areaId !== requester.areaId) {
        continue;
      }

      const area = await this.areaRepo.findById(solicitation.areaId);
      const creator = await this.userRepo.findById(wf.creatorId);

      result.push({
        id: wf.id,
        title: wf.title || "Sem título",
        requesterName: creator ? creator.name : "Usuário Removido",
        areaName: area ? area.name : "Área Removida",
        areaId: solicitation.areaId,
        status: wf.status,
        createdAt: wf.createdAt
      });
    }

    return result;
  }
}
