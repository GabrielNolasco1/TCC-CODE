import { UserRepository } from "@/infrastructure/database/typeorm/repositories/UserRepository";
import { BcryptHashProvider } from "@/infrastructure/providers/bcrypt/BcryptHashProvider";
import { JwtTokenProvider } from "@/infrastructure/providers/auth/JwtTokenProvider"; // <-- Importe o novo provider
import { CreateUserUseCase } from "@/application/use-cases/UserCases/CreateUserUseCase";
import { AuthenticateUserUseCase } from "@/application/use-cases/UserCases/AuthenticateUserUseCase";
import { UserController } from "@/presentation/controllers/UserController";

export const makeUserController = (): UserController => {
  const userRepository = new UserRepository();
  const hashProvider = new BcryptHashProvider();
  const tokenProvider = new JwtTokenProvider();

  const createUserUseCase = new CreateUserUseCase(userRepository, hashProvider);
  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository, hashProvider);

  return new UserController(
    createUserUseCase, 
    authenticateUserUseCase, 
    tokenProvider
  );
};