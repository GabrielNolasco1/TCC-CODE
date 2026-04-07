import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "@/infrastructure/docs/swagger.json";

// ROUTES
import { userRoutes } from "@/infrastructure/http/routes/user.routes";
import { tokenRoutes } from "@/infrastructure/http/routes/token.routes";
import { areaRoutes } from "@/infrastructure/http/routes/area.routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/health", (req, res) => {
  return res.json({ status: "Sistema de Solicitações Online" });  
}); 


app.use("/users", userRoutes);
app.use("/tokens", tokenRoutes);
app.use("/areas", areaRoutes);

export { app };