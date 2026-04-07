import * as bcrypt from "bcrypt";
import { IHashProvider } from "@/application/providers/IHashProvider";

export class BcryptHashProvider implements IHashProvider {
  private readonly saltRounds = 10;

  async hash(payload: string): Promise<string> {
    return await bcrypt.hash(payload, this.saltRounds);
  }

  async compare(payload: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(payload, hashed);
  }
}