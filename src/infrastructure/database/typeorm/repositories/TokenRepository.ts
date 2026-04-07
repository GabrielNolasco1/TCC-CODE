import { Repository } from "typeorm";
import { AppDataSource } from "@/infrastructure/database/typeorm/data-source";
import { Token } from "@/domain/entities/Token";
import { TokenSchema } from "@/infrastructure/database/typeorm/schemas/TokenSchema";
import { ITokenRepository } from "@/domain/repositories/ITokenRepository";
import { TokenMapper } from "@/infrastructure/database/typeorm/mappers/TokenMapper";

export class TokenRepository implements ITokenRepository {
  private ormRepository: Repository<TokenSchema>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(TokenSchema);
  }

  async findUserLastToken(userId: string): Promise<Token | null> {
    const schema = await this.ormRepository.findOne({
    where: { userId },
    order: { createdAt: 'DESC' }
    });
    return schema ? TokenMapper.toDomain(schema) : null;
  }


  async save(token: Token): Promise<Token> {
    const persistenceData = TokenMapper.toPersistence(token);
    const savedSchema = await this.ormRepository.save(persistenceData);
    return TokenMapper.toDomain(savedSchema);
  }
}