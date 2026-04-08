import { Request, Response } from "express";
import { SetApprovalFlowUseCase } from "@/application/use-cases/ApprovalFlowCases/SetApprovalFlowUseCase";
import { GetApprovalFlowUseCase } from "@/application/use-cases/ApprovalFlowCases/GetApprovalFlowUseCase";

export class ApprovalFlowController {
  constructor(
    private setUseCase: SetApprovalFlowUseCase,
    private getUseCase: GetApprovalFlowUseCase
  ) {}

  async handleSet(req: Request, res: Response) {
    try {
      const result = await this.setUseCase.execute(req.body, req.user);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async handleGet(req: Request, res: Response) {
    try {
      const solicitationId = req.params.solicitationId as string;
      const result = await this.getUseCase.execute(solicitationId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
