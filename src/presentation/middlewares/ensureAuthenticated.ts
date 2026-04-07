import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
  access: string;
}

export function ensureAuthenticated(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token is missing." });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub, access } = verify(token, process.env.JWT_SECRET || "chave_secreta") as IPayload;

    req.user = {
      id: sub,
      access,
    };

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}