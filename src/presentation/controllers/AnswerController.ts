import { Request, Response } from "express";
import { CreateAnswerUseCase } from "@/application/use-cases/AnswerCases/CreateAnswerUseCase";

export class AnswerController {
  constructor(private createAnswer: CreateAnswerUseCase) {}

  async handleCreate(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.createAnswer.execute(req.body);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
