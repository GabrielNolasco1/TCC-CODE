import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
  access: string;
  areaId: string | null;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token is missing." });

  const [, token] = authHeader.split(" ");

  try {
    const { sub, access, areaId } = verify(token, process.env.JWT_SECRET || "secret_key") as IPayload;

    req.user = {
      id: sub,
      access,
      areaId,
    };

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}
