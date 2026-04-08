import { IUserRepository } from "@/domain/repositories/IUserRepository";

export class ListUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute() {
    const users = await this.userRepository.findAll();

    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      access: user.access,
      areaId: user.areaId,
      approvalLevel: user.approvalLevel,
      isApproved: user.isApproved
    }));
  }
}
