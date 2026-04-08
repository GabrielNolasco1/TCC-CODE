import { Solicitation } from "@/domain/entities/Solicitation";
import { ISolicitationRepository } from "@/domain/repositories/ISolicitationRepository";
import { AccessRole } from "@/domain/entities/User";

export class CreateSolicitationUseCase {
  constructor(private solicitationRepository: ISolicitationRepository) {}

  async execute(name: string, areaId: string, requester: any): Promise<Solicitation> {
    console.log("Requester info:", requester);
    console.log("Area ID:", areaId);
    if (requester.access === AccessRole.ADMIN && requester.areaId !== areaId) {
      throw new Error("Admins can only create solicitations for their own area.");
    }
    const solicitation = new Solicitation({ name, areaId });
    return await this.solicitationRepository.save(solicitation);
  }
}
