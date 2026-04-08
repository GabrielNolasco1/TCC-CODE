import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApprovalStatus } from "@/domain/entities/Approval";

@Entity("approvals")
export class ApprovalSchema {
  @PrimaryColumn("uuid") id!: string;

  @Column({ name: "workflow_id" }) workflowId!: string;

  @Column({ name: "approver_id" }) approverId!: string;

  @Column({ type: "enum", enum: ApprovalStatus }) status!: ApprovalStatus;

  @Column() order!: number;

  @Column({ type: "text", nullable: true }) comments!: string | null;

  @CreateDateColumn({ name: "created_at" }) createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" }) updatedAt!: Date;
}
