import { Request, Response } from "express";
import { CreateUserUseCase } from "@/application/use-cases/UserCases/CreateUserUseCase";
import { AuthenticateUserUseCase } from "@/application/use-cases/UserCases/AuthenticateUserUseCase";
import { ListUsersUseCase } from "@/application/use-cases/UserCases/ListUsersUseCase";
import { UpdateUserAdminUseCase } from "@/application/use-cases/UserCases/UpdateUserAdminUseCase";
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private authenticateUserUseCase: AuthenticateUserUseCase,
    private listUsersUseCase: ListUsersUseCase,
    private updateUserAdminUseCase: UpdateUserAdminUseCase
  ) {}

  async handleCreate(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.createUserUseCase.execute(req.body);

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
      const { user, token } = await this.authenticateUserUseCase.execute(req.body);

      return res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          access: user.access,
          valid: user.valid,
          areaId: user.areaId
        },
        token
      });
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  async handleList(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.listUsersUseCase.execute();
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async handleUpdate(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const result = await this.updateUserAdminUseCase.execute({
        userId: id,
        ...req.body
      });
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
