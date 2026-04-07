import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { IHashProvider } from "@/application/providers/IHashProvider";
import { User, AccessRole } from "@/domain/entities/User";

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
  areaId?: string;
}

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider
  ) {}

  async execute(data: CreateUserDTO): Promise<User> {

    const userAlreadyExists = await this.userRepository.findByEmail(data.email);
    if (userAlreadyExists) throw new Error("User already exists.");


    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(data.password)) {
      throw new Error("Password must be at least 8 characters long and contain a special character.");
    }

    const totalUsers = await this.userRepository.count();
    const isFirstUser = totalUsers === 0;
    
    const passwordHash = await this.hashProvider.hash(data.password);

    const user = new User({
      name: data.name,
      email: data.email,
      passwordHash: passwordHash,
      access: isFirstUser ? AccessRole.MASTER : AccessRole.USER,
      areaId: isFirstUser ? null : (data.areaId || null),
    });

    return await this.userRepository.save(user);
  }
}