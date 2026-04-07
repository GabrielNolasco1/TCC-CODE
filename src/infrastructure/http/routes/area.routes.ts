import { Router } from "express";
import { makeAreaController } from "@/main/factories/makeAreaController";
import { ensureAuthenticated } from "@/presentation/middlewares/ensureAuthenticated";
import { ensureRole } from "@/presentation/middlewares/ensureRole";
import { AccessRole } from "@/domain/entities/User";

const areaRoutes = Router();
const areaController = makeAreaController();

areaRoutes.use(ensureAuthenticated);

// Rota de visualização (Qualquer logado)
areaRoutes.get("/", (req, res) => areaController.handleList(req, res));

// Rotas restritas ao MASTER
const masterOnly = ensureRole([AccessRole.MASTER]);

areaRoutes.post("/", masterOnly, (req, res) => areaController.handleCreate(req, res));
areaRoutes.patch("/:id", masterOnly, (req, res) => areaController.handleUpdate(req, res));
areaRoutes.delete("/:id", masterOnly, (req, res) => areaController.handleDelete(req, res));

export { areaRoutes };