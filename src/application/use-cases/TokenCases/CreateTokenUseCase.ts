import { ITokenRepository } from "@/domain/repositories/ITokenRepository";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { ITokenGeneratorProvider } from "@/application/providers/ITokenGeneratorProvider";
import { IMailProvider } from "@/application/providers/IMailProvider"; // O novo contrato
import { Token } from "@/domain/entities/Token";

export type CreateTokenDTO = {
    email: string;
};

export class CreateTokenUseCase {
    constructor(
        private tokenRepository: ITokenRepository,
        private userRepository: IUserRepository,
        private tokenGenerator: ITokenGeneratorProvider,
        private mailProvider: IMailProvider
    ){}

    async execute(data: CreateTokenDTO): Promise<Token>{
        
        const user = await this.userRepository.findByEmail(data.email);
        if(!user) {
            throw new Error("User does not exist with this e-mail.");
        }

        const code = this.tokenGenerator.generate(8);

        const expiresIn = new Date();
        expiresIn.setMinutes(expiresIn.getMinutes() + 5);

        const tokenToSave = new Token({
            code,   
            userId: user.id,
            expiresIn,
        });

        const savedToken = await this.tokenRepository.save(tokenToSave);

        await this.mailProvider.sendMail({
            to: user.email,
            subject: "Seu Código de Acesso",
            body: `
                <h1>Olá, ${user.name}!</h1>
                <p>Seu código de verificação é: <strong>${code}</strong></p>
                <p>Este código expira em 5 minutos.</p>
            `
        });

        return savedToken;
    }
}