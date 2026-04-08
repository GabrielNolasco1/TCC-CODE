import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

import { UserSchema } from "@/infrastructure/database/typeorm/schemas/UserSchema";
import { TokenSchema } from "@/infrastructure/database/typeorm/schemas/TokenSchema";
import { AreaSchema } from "@/infrastructure/database/typeorm/schemas/AreaSchema";
import { SolicitationSchema } from "./schemas/SolicitationSchema";
import { AnswerSchema } from "./schemas/AnswerSchema";
import { ApprovalConfigSchema } from "./schemas/ApprovalConfigSchema";
import { ApprovalFlowSchema } from "./schemas/ApprovalFlowSchema";
import { ApprovalSchema } from "./schemas/ApprovalSchema";
import { InputSchema } from "./schemas/InputSchema";
import { SectionSchema } from "./schemas/SectionSchema";
import { WorkflowSchema } from "./schemas/WorkflowSchema";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
      UserSchema,
      TokenSchema,
      AreaSchema,
      SolicitationSchema,
      AnswerSchema,
      ApprovalConfigSchema,
      ApprovalFlowSchema,
      ApprovalSchema,
      InputSchema,
      SectionSchema,
      WorkflowSchema
    ],
    migrations: [],
    subscribers: [],
});
