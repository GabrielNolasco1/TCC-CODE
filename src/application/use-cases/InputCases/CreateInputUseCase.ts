import { Input, InputType } from "@/domain/entities/Input";
import { IInputRepository } from "@/domain/repositories/IInputRepository";
import { ISectionRepository } from "@/domain/repositories/ISectionRepository";
import { ISolicitationRepository } from "@/domain/repositories/ISolicitationRepository";
import { AccessRole } from "@/domain/entities/User";

export class CreateInputUseCase {
  constructor(
    private inputRepo: IInputRepository,
    private sectionRepo: ISectionRepository,
    private solicitationRepo: ISolicitationRepository
  ) {}

  async execute(data: any, requester: any): Promise<Input> {
    console.log("Requester Access Role:", requester.access);
    console.log("Input Data:", data);
    const section = await this.sectionRepo.findById(data.sectionId);
    if (!section) throw new Error("Section not found.");

    const solicitation = await this.solicitationRepo.findById(section.solicitationId);
    if (requester.access === AccessRole.ADMIN && requester.areaId !== solicitation?.areaId) {
      throw new Error("Access denied.");
    }

    const input = new Input(data);
    return await this.inputRepo.save(input);
  }
}
