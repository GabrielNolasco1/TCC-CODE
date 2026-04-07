import { ITokenGeneratorProvider } from "@/application/providers/ITokenGeneratorProvider";
import { randomInt } from "crypto";

export class CryptoTokenGeneratorProvider implements ITokenGeneratorProvider {
  generate(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    
    for (let i = 0; i < length; i++) {
      const index = randomInt(0, chars.length);
      code += chars[index];
    }
    
    return code;
  }
}