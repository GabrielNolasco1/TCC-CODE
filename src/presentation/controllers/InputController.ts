import { Request, Response } from "express";
import { CreateInputUseCase } from "@/application/use-cases/InputCases/CreateInputUseCase";

export class InputController {
  constructor(private createInput: CreateInputUseCase) {}

  async handleCreate(req: Request, res: Response): Promise<Response> {
    try {
      console.log("Creating input with data:", req.body);
      const result = await this.createInput.execute(req.body, req.user);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
