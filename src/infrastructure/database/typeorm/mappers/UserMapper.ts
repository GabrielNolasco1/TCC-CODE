import { User } from "@/domain/entities/User";
import { UserSchema } from "../schemas/UserSchema";

export class UserMapper {
  static toDomain(schema: UserSchema): User {
    return new User({
      id: schema.id,
      name: schema.name,
      email: schema.email,
      passwordHash: schema.passwordHash,
      approvalLevel: schema.approvalLevel,
      access: schema.access,
      valid: schema.valid,
      firstLogin: schema.firstLogin,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      areaId: schema.areaId,
      areaName: schema.area ? schema.area.name : undefined,
      isApproved: schema.isApproved
    });
  }

  static toPersistence(user: User): Partial<UserSchema> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      access: user.access,
      valid: user.valid,
      areaId: user.areaId,
      approvalLevel: user.approvalLevel,
      firstLogin: user.firstLogin,
      isApproved: user.isApproved
    };
  }
}
