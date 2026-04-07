import { Token } from "@/domain/entities/Token";
import { TokenSchema } from "../schemas/TokenSchema";

export class TokenMapper {
  static toDomain(schema: TokenSchema): Token {
    return new Token({
      id: schema.id,
      code: schema.code,
      userId: schema.userId,
      expiresIn: schema.expiresIn,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt
    });
  }

  static toPersistence(token: Token): Partial<TokenSchema> {
    return {
      id: token.id,
      code: token.code,
      userId: token.userId,
      expiresIn: token.expiresIn
    };
  }
}