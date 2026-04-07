import { CreateUserUseCase } from "@/application/use-cases/CreateUserUseCase";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { IHashProvider } from "@/application/providers/IHashProvider";
import { User, AccessRole } from "@/domain/entities/User";

class InMemoryUserRepository implements IUserRepository {
  public users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  async findById(userId: string): Promise<User | null> {
    return this.users.find(user => user.id === userId) || null;
  }

  async count(): Promise<number> {
    return this.users.length;
  }

  async save(user: User): Promise<User> {
    if (!user.id || user.id === "") {
      user.id = "mocked-uuid-12345";
    }
    this.users.push(user);
    return user;
  }
}

class MockHashProvider implements IHashProvider {
  async hash(payload: string): Promise<string> {
    return payload.split('').reverse().join('');
  }

  async compare(payload: string, hashed: string): Promise<boolean> {
    const hashedPayload = await this.hash(payload);
    return hashedPayload === hashed;
  }
}


describe("CreateUserUseCase", () => {
  let userRepository: InMemoryUserRepository;
  let hashProvider: MockHashProvider;
  let sut: CreateUserUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    hashProvider = new MockHashProvider();
    
    // Agora passamos as DUAS dependências para o Caso de Uso
    sut = new CreateUserUseCase(userRepository, hashProvider);
  });

  it("deve criar o primeiro usuário como MASTER", async () => {
    const response = await sut.execute({
      name: "Primeiro Usuário",
      email: "primeiro@teste.com",
      password: "SenhaForte@123"
    });

    expect(response).toHaveProperty("id");
    expect(response.access).toBe(AccessRole.MASTER);
    expect(response.email).toBe("primeiro@teste.com");
    expect(response.passwordHash).toBe("321@etroFahneS");
    expect(userRepository.users).toHaveLength(1);
  });

  it("deve lançar um erro se a senha for fraca", async () => {
    await expect(
      sut.execute({
        name: "Usuário Senha Fraca",
        email: "fraco@teste.com",
        password: "123"
      })
    ).rejects.toThrow("Password must be at least 8 characters long and contain a special character.");
  });

  it("deve lançar um erro se o e-mail já estiver em uso", async () => {
    // Criamos um usuário prévio
    await sut.execute({
      name: "Usuário Existente",
      email: "duplicado@teste.com",
      password: "SenhaForte@123"
    });

    // Tentamos criar outro com o mesmo e-mail
    await expect(
      sut.execute({
        name: "Novo Usuário",
        email: "duplicado@teste.com",
        password: "SenhaForte@123"
      })
    ).rejects.toThrow("User already exists.");
  });
});