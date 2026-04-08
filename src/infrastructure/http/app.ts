import "reflect-metadata";
import express from "express";
import cors from "cors"; // 1. Importe o CORS
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "@/infrastructure/docs/swagger.json";

// ROUTES
import { userRoutes } from "@/infrastructure/http/routes/user.routes";
import { tokenRoutes } from "@/infrastructure/http/routes/token.routes";
import { areaRoutes } from "@/infrastructure/http/routes/area.routes";
import { solicitationRoutes } from "./routes/solicitation.routes";
import { sectionRoutes } from "./routes/section.routes";
import { answerRoutes } from "./routes/answer.routes";
import { approvalRoutes } from "./routes/approval.routes";
import { approvalConfigRoutes } from "./routes/approval-config.routes";
import { approvalFlowRoutes } from "./routes/approval-flow.routes";
import { inputRoutes } from "./routes/input.routes";
import { workflowRoutes } from "./routes/workflow.routes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/health", (req, res) => {
  return res.json({ status: "Sistema de Solicitações Online" });
});

app.use("/solicitations", solicitationRoutes);
app.use("/users", userRoutes);
app.use("/tokens", tokenRoutes);
app.use("/areas", areaRoutes);
app.use("/sections", sectionRoutes);
app.use("/answers", answerRoutes);
app.use("/approvals", approvalRoutes);
app.use("/config-approvals", approvalConfigRoutes);
app.use("/flow-approvals", approvalFlowRoutes);
app.use("/inputs", inputRoutes);
app.use("/workflows", workflowRoutes);

export { app };
