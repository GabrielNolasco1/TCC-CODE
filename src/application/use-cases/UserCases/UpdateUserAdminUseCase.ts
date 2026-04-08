import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { AccessRole } from "@/domain/entities/User";

export type UpdateUserAdminRequest = {
  userId: string;
  access?: AccessRole;
  areaId?: string | null;
  isApproved?: boolean;
  approvalLevel?: number; // Adicionado para suportar os níveis 1 a 13
};

export class UpdateUserAdminUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: UpdateUserAdminRequest) {
    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      throw new Error("User not found.");
    }

    if (data.access !== undefined) user.access = data.access;
    if (data.areaId !== undefined) user.areaId = data.areaId;
    if (data.isApproved !== undefined) user.isApproved = data.isApproved;
    if (data.approvalLevel !== undefined) user.approvalLevel = data.approvalLevel;

    return await this.userRepository.save(user);
  }
}
