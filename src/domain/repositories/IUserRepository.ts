import { User } from "../entities/User";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<User>;
  count(): Promise<number>;
  findAll(): Promise<User[]>;
  findApproverByLevel(areaId: string, approvalLevel: number): Promise<User | null>;
}
