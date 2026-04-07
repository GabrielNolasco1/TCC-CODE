import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { IHashProvider } from "@/application/providers/IHashProvider";
import { User } from "@/domain/entities/User";

export type AuthenticateUserDTO = {
  email: string;
  password: string;
};

export type AuthenticateUserResponse = {
  user: User;
};

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider
  ) {}

  async execute(data: AuthenticateUserDTO): Promise<AuthenticateUserResponse> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("Invalid credentials.");
    }

    const passwordMatch = await this.hashProvider.compare(
      data.password, 
      user.passwordHash
    );

    if (!passwordMatch) {
      throw new Error("Invalid credentials.");
    }

    return { user };
  }
}