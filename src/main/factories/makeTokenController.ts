import { TokenRepository } from "@/infrastructure/database/typeorm/repositories/TokenRepository";
import { UserRepository } from "@/infrastructure/database/typeorm/repositories/UserRepository";
import { CryptoTokenGeneratorProvider } from "@/infrastructure/providers/crypto/CryptoTokenGeneratorProvider";
import { NodemailerMailProvider } from "@/infrastructure/providers/mail/nodemailer/NodemailerMailProvider";
import { CreateTokenUseCase } from "@/application/use-cases/TokenCases/CreateTokenUseCase";
import { VerifyTokenUseCase } from "@/application/use-cases/TokenCases/VerifyTokenUseCase";
import { TokenController } from "@/presentation/controllers/TokenController";

export const makeTokenController = (): TokenController => {
  const tokenRepository = new TokenRepository();
  const userRepository = new UserRepository();
  const tokenGenerator = new CryptoTokenGeneratorProvider();
  const mailProvider = new NodemailerMailProvider();

  const createTokenUseCase = new CreateTokenUseCase(
    tokenRepository, 
    userRepository, 
    tokenGenerator, 
    mailProvider
  );
  
  const verifyTokenUseCase = new VerifyTokenUseCase(tokenRepository, userRepository);

  return new TokenController(createTokenUseCase, verifyTokenUseCase);
};