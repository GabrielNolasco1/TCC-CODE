import { Repository } from "typeorm";
import { AppDataSource } from "@/infrastructure/database/typeorm/data-source";
import { User } from "@/domain/entities/User";
import { UserSchema } from "../schemas/UserSchema";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { UserMapper } from "../mappers/UserMapper";

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<UserSchema>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(UserSchema);
  }

  async findByEmail(email: string): Promise<User | null> {
    const schema = await this.ormRepository.findOne({
      where: { email },
      relations: ["area"],
    });
    return schema ? UserMapper.toDomain(schema) : null;
  }

  async findById(id: string): Promise<User | null> {
    const schema = await this.ormRepository.findOne({
      where: { id },
      relations: ["area"],
    });
    return schema ? UserMapper.toDomain(schema) : null;
  }

  async count(): Promise<number> {
    return await this.ormRepository.count();
  }

  async save(user: User): Promise<User> {
    const persistenceData = UserMapper.toPersistence(user);
    const savedSchema = await this.ormRepository.save(persistenceData);
    return UserMapper.toDomain(savedSchema);
  }

  async findApproverByLevel(areaId: string, approvalLevel: number): Promise<User | null> {
    const schema = await this.ormRepository.findOne({
      where: { areaId, approvalLevel },
      order: { createdAt: "ASC" }
    });
    return schema ? UserMapper.toDomain(schema) : null;
  }

  async findAll(): Promise<User[]> {
    const ormUsers = await this.ormRepository.find({
      relations: ["area"] // Importante para o areaName aparecer
    });

    return ormUsers.map(ormUser => UserMapper.toDomain(ormUser));
  }
}
