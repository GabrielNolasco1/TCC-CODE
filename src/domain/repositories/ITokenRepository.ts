import { Token } from "@/domain/entities/Token"

export interface ITokenRepository {
    findUserLastToken(email: string): Promise<Token | null>;
    save(token: Token): Promise<Token>;
}