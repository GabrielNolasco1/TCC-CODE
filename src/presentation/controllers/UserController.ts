import { Request, Response } from "express";
import { CreateUserUseCase } from "@/application/use-cases/UserCases/CreateUserUseCase";
import { AuthenticateUserUseCase } from "@/application/use-cases/UserCases/AuthenticateUserUseCase";
import { ITokenProvider } from "@/application/providers/ITokenProvider";

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private authenticateUserUseCase: AuthenticateUserUseCase,
    private tokenProvider: ITokenProvider
  ) {}

  async handleCreate(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.createUserUseCase.execute(req.body);

      // Retornamos apenas o que o Front-end precisa (Segurança!)
      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        access: user.access
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async handleLogin(req: Request, res: Response): Promise<Response> {
    try {
      // 1. O UseCase valida se as credenciais estão corretas
      const { user } = await this.authenticateUserUseCase.execute(req.body);

      // 2. O Provider gera o Token (sem o Controller saber que é JWT)
      const token = this.tokenProvider.generate(user.id, user.access);

      // 3. Resposta estruturada: Dados do Usuário + Token
      return res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          access: user.access,
          valid: user.valid, // Campo vital para o seu fluxo de 2FA
          areaId: user.areaId
        },
        token
      });
    } catch (error: any) {
      // 401 para falhas de autenticação
      return res.status(401).json({ message: error.message });
    }
  }
}