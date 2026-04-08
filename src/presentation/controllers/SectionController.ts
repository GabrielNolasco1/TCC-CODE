import { Request, Response } from "express";
import { CreateSectionUseCase } from "@/application/use-cases/SectionCases/CreateSectionUseCase";
import { DeleteSectionUseCase } from "@/application/use-cases/SectionCases/DeleteSectionUseCase";

export class SectionController {
  constructor(
    private createSection: CreateSectionUseCase,
    private deleteSection: DeleteSectionUseCase
  ) {}

  async handleCreate(req: Request, res: Response) {
    try {
      const { solicitationId, title, order } = req.body;
      const result = await this.createSection.execute(solicitationId, title, order, req.user);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async handleDelete(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      await this.deleteSection.execute(id, req.user);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
