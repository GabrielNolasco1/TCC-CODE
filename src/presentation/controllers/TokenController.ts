import { Request, Response } from "express";
import { CreateTokenUseCase } from "@/application/use-cases/TokenCases/CreateTokenUseCase";
import { VerifyTokenUseCase } from "@/application/use-cases/TokenCases/VerifyTokenUseCase";

export class TokenController {
  constructor(
    private createTokenUseCase: CreateTokenUseCase,
    private verifyTokenUseCase: VerifyTokenUseCase
  ) {}

  async handleSendCode(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;
      await this.createTokenUseCase.execute({ email });
      return res.status(200).json({ message: "Verification code sent to email." });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async handleVerify(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.verifyTokenUseCase.execute(req.body);
      return res.status(200).json({ 
        message: "Account verified successfully!",
        user 
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}