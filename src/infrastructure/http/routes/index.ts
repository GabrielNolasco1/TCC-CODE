import { Router } from "express";
import { userRoutes } from "./user.routes";
import { tokenRoutes } from "./token.routes";
import { areaRoutes } from "./area.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/tokens", tokenRoutes);
router.use("/areas", areaRoutes);

export { router };