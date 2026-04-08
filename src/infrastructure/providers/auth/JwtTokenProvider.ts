import { sign } from "jsonwebtoken";
import { ITokenProvider } from "@/application/providers/ITokenProvider";

export class JwtTokenProvider implements ITokenProvider {
  generate(userId: string, access: string, areaId: string | null): string {
    return sign({ access, areaId }, process.env.JWT_SECRET || "secret", {
      subject: userId,
      expiresIn: "1d",
    });
  }
}
