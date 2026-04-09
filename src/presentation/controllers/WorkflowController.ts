import { Request, Response } from "express";
import { CreateWorkflowUseCase } from "@/application/use-cases/WorkflowCases/CreateWorkflowUseCase";
import { GetWorkflowDetailUseCase } from "@/application/use-cases/WorkflowCases/GetWorkflowDetailUseCase";
import { ListWorkflowsByUserUseCase } from "@/application/use-cases/WorkflowCases/ListWorkflowsByUserUseCase";
import { ListManagementWorkflowsUseCase } from "@/application/use-cases/WorkflowCases/ListManagementWorkflowsUseCase";

export class WorkflowController {
  constructor(
    private createWorkflow: CreateWorkflowUseCase,
    private listByUser: ListWorkflowsByUserUseCase,
    private getDetail: GetWorkflowDetailUseCase,
    private listManagement: ListManagementWorkflowsUseCase
  ) {}

  async handleCreate(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.createWorkflow.execute(req.body, req.user);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async handleListManagement(req: Request, res: Response) {
    try {
      const result = await this.listManagement.execute(req.user);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async handleListMyWorkflows(req: Request, res: Response) {
    try {
      const result = await this.listByUser.execute(req.user.id);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async handleGetDetail(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const result = await this.getDetail.execute(id);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
