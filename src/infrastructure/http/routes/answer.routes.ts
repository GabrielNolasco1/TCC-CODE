import { Router } from "express";
import { makeAnswerController } from "@/main/factories/makeAnswerController";
import { ensureAuthenticated } from "@/presentation/middlewares/ensureAuthenticated";

const answerRoutes = Router();
const controller = makeAnswerController();

answerRoutes.use(ensureAuthenticated);

// Qualquer usuário autenticado pode responder um formulário
answerRoutes.post("/", (req, res) => controller.handleCreate(req, res));

export { answerRoutes };
