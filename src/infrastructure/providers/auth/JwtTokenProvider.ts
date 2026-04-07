import { sign } from "jsonwebtoken";
import { ITokenProvider } from "@/application/providers/ITokenProvider";

export class JwtTokenProvider implements ITokenProvider {
  generate(userId: string, access: string): string {
    return sign({ access }, process.env.JWT_SECRET || "secret", {
      subject: userId,
      expiresIn: "1d",
    });
  }
}