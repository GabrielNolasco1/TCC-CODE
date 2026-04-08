import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { WorkflowProgress, WorkflowStatus } from "@/domain/entities/Workflow";

@Entity("workflows")
export class WorkflowSchema {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "creator_id" })
  creatorId!: string;

  @Column({ name: "solicitation_id" })
  solicitationId!: string;

  @Column()
  title!: string;

  @Column({ type: "enum", enum: WorkflowProgress })
  progress!: WorkflowProgress;

  @Column({ type: "enum", enum: WorkflowStatus })
  status!: WorkflowStatus;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
