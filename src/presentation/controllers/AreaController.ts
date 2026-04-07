import { Request, Response } from "express";
import { CreateAreaUseCase } from "@/application/use-cases/AreaCases/CreateAreaUseCase";
import { ListAreasUseCase } from "@/application/use-cases/AreaCases/ListAreasUseCase";
import { UpdateAreaUseCase } from "@/application/use-cases/AreaCases/UpdateAreaUseCase";
import { DeleteAreaUseCase } from "@/application/use-cases/AreaCases/DeleteAreaUseCase";

export class AreaController {
  constructor(
    private createArea: CreateAreaUseCase,
    private listAreas: ListAreasUseCase,
    private updateArea: UpdateAreaUseCase,
    private deleteArea: DeleteAreaUseCase
  ) {}

  async handleCreate(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body;
      const area = await this.createArea.execute(name);
      return res.status(201).json(area);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async handleUpdate(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id as string;
      const { name } = req.body;

      const updatedArea = await this.updateArea.execute(id, name);
      
      return res.json(updatedArea);
    } catch (error: any) {
      const status = error.message === "Area not found" ? 404 : 400;
      return res.status(status).json({ message: error.message });
    }
  }

  async handleList(req: Request, res: Response): Promise<Response> {
    try {
      const areas = await this.listAreas.execute();
      return res.json(areas);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async handleDelete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id as string;
      await this.deleteArea.execute(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}