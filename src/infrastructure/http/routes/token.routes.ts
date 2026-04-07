import { Router } from "express";
import { makeTokenController } from "@/main/factories/makeTokenController";
import { ensureAuthenticated } from "@/presentation/middlewares/ensureAuthenticated";

const tokenRoutes = Router();
const tokenController = makeTokenController();

tokenRoutes.post("/send", (req, res) => tokenController.handleSendCode(req, res));
tokenRoutes.post("/verify", (req, res) => tokenController.handleVerify(req, res));

export { tokenRoutes };