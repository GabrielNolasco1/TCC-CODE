import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { IHashProvider } from "@/application/providers/IHashProvider";
import { ITokenProvider } from "@/application/providers/ITokenProvider"; // Importe o Provider
import { User, ValidationStatus } from "@/domain/entities/User";

export type AuthenticateUserDTO = {
  email: string;
  password: string;
};

// Agora a resposta precisa incluir o token
export type AuthenticateUserResponse = {
  user: User;
  token: string;
};

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider,
    private tokenProvider: ITokenProvider
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

    if (user.valid === ValidationStatus.NOT_VALID) {
      throw new Error("USER_NOT_VALIDATED");
    }

    console.log(user);
    console.log("User approval status:", user.isApproved);
    if (!user.isApproved) {
      throw new Error("USER_NOT_APPROVED");
    }


    const token = this.tokenProvider.generate(
      user.id,
      user.access,
      user.areaId
    );

    return { user, token };
  }
}
