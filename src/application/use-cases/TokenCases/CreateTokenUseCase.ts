import { ITokenRepository } from "@/domain/repositories/ITokenRepository";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { ITokenGeneratorProvider } from "@/application/providers/ITokenGeneratorProvider";
import { IMailProvider } from "@/application/providers/IMailProvider";
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
        console.log(`[CreateTokenUseCase] Iniciando solicitação de token para: ${data.email}`);

        const user = await this.userRepository.findByEmail(data.email);
        if(!user) {
            console.error(`[CreateTokenUseCase] Falha: Usuário não encontrado no banco (${data.email})`);
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
        console.log(`[CreateTokenUseCase] Token gerado e salvo no banco. ID do Usuário: ${user.id}`);

        // Fire-and-Forget: Envia o e-mail em background sem travar a requisição
        console.log(`[CreateTokenUseCase] Disparando envio de e-mail em background...`);
        this.mailProvider.sendMail({
            to: user.email,
            subject: "Seu Código de Acesso",
            body: `
                <h1>Olá, ${user.name}!</h1>
                <p>Seu código de verificação é: <strong>${code}</strong></p>
                <p>Este código expira em 5 minutos.</p>
            `
        })
        .then(() => {
            // Isso vai aparecer no Render uns 5 segundos depois que a tela do front-end já destravou
            console.log(`[CreateTokenUseCase] ✅ Sucesso! E-mail entregue para: ${user.email}`);
        })
        .catch((error) => {
            // Se der erro (ex: credencial inválida), não derruba a API, apenas registra no log
            console.error(`[CreateTokenUseCase] ❌ Erro crítico ao enviar e-mail para ${user.email}:`, error);
        });

        console.log(`[CreateTokenUseCase] Resposta liberada para o Front-end!`);
        return savedToken;
    }
}
