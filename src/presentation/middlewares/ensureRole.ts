import { Request, Response, NextFunction } from "express";
import { AccessRole } from "@/domain/entities/User";

export function ensureRole(roles: AccessRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as { id: string, access: string };
    
    if (!user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!roles.includes(user.access as AccessRole)) {
      return res.status(403).json({ 
        message: "Access denied. Only MASTER users can perform this action." 
      });
    }

    return next();
  };
}