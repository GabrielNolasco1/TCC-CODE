import { Request, Response } from "express";
import { CreateSolicitationUseCase } from "@/application/use-cases/SolicitationCases/CreateSolicitationUseCase";
import { ListSolicitationsUseCase } from "@/application/use-cases/SolicitationCases/ListSolicitationsUseCase";
import { UpdateSolicitationUseCase } from "@/application/use-cases/SolicitationCases/UpdateSolicitationUseCase";
import { DeleteSolicitationUseCase } from "@/application/use-cases/SolicitationCases/DeleteSolicitationUseCase";
// 1. Importado o novo Use Case
import { GetSolicitationFormUseCase } from "@/application/use-cases/SolicitationCases/GetSolicitationFormUseCase";

export class SolicitationController {
  constructor(
    private createSolicitation: CreateSolicitationUseCase,
    private listSolicitations: ListSolicitationsUseCase,
    private updateSolicitation: UpdateSolicitationUseCase,
    private deleteSolicitation: DeleteSolicitationUseCase,
    // 2. Injetado no construtor
    private getFormUseCase: GetSolicitationFormUseCase
  ) {}

  async handleCreate(req: Request, res: Response): Promise<Response> {
    try {
      const { name, areaId } = req.body;
      const result = await this.createSolicitation.execute(name, areaId, req.user);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async handleList(req: Request, res: Response): Promise<Response> {
    try {
      const onlyArea = req.query.onlyArea === 'true';
      const result = await this.listSolicitations.execute(req.user, onlyArea);

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async handleUpdate(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id as string;
      const { name } = req.body;
      const result = await this.updateSolicitation.execute(id, name, req.user);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async handleDelete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id as string;
      await this.deleteSolicitation.execute(id, req.user);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }


  async handleGetForm(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id as string;
      const formTree = await this.getFormUseCase.execute(id);

      return res.status(200).json(formTree);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
