import { UserRepository } from "@/infrastructure/database/typeorm/repositories/UserRepository";
import { BcryptHashProvider } from "@/infrastructure/providers/bcrypt/BcryptHashProvider";
import { JwtTokenProvider } from "@/infrastructure/providers/auth/JwtTokenProvider";
import { CreateUserUseCase } from "@/application/use-cases/UserCases/CreateUserUseCase";
import { AuthenticateUserUseCase } from "@/application/use-cases/UserCases/AuthenticateUserUseCase";
import { UserController } from "@/presentation/controllers/UserController";
import { ListUsersUseCase } from "@/application/use-cases/UserCases/ListUsersUseCase";
import { UpdateUserAdminUseCase } from "@/application/use-cases/UserCases/UpdateUserAdminUseCase";

export const makeUserController = (): UserController => {
  const userRepository = new UserRepository();
  const hashProvider = new BcryptHashProvider();
  const tokenProvider = new JwtTokenProvider();

  const createUserUseCase = new CreateUserUseCase(userRepository, hashProvider);
  const listUsersUseCase = new ListUsersUseCase(userRepository);
  const updateUserAdminUseCase = new UpdateUserAdminUseCase(userRepository);

  const authenticateUserUseCase = new AuthenticateUserUseCase(
    userRepository,
    hashProvider,
    tokenProvider
  );

  return new UserController(
    createUserUseCase,
    authenticateUserUseCase,
    listUsersUseCase,
    updateUserAdminUseCase
  );
};
