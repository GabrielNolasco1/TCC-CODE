import { Request, Response } from "express";
import { ProcessApprovalActionUseCase } from "@/application/use-cases/ApprovalCases/ProcessApprovalActionUseCase";
import { ListPendingApprovalsUseCase } from "@/application/use-cases/ApprovalCases/ListPendingApprovalsUseCase";

export class ApprovalController {
  constructor(
    private processApproval: ProcessApprovalActionUseCase,
    private listPending: ListPendingApprovalsUseCase
  ) {}

  async handleProcess(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.processApproval.execute(req.body, req.user.id);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async handleListMyPending(req: Request, res: Response) {
    try {
      const result = await this.listPending.execute(req.user.id);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
