import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { FallbackAction } from "@/domain/entities/ApprovalConfig";
import { SolicitationSchema } from "./SolicitationSchema";

@Entity("approval_configs")
export class ApprovalConfigSchema {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "solicitation_id", unique: true })
  solicitationId!: string;

  @OneToOne(() => SolicitationSchema)
  @JoinColumn({ name: "solicitation_id" })
  solicitation!: SolicitationSchema;

  @Column({ type: "int", name: "necessary_approver_level", nullable: true })
  necessaryApproverLevel!: number | null;

  @Column({ type: "enum", enum: FallbackAction, name: "if_not_have_approver_level", nullable: true })
  ifNotHaveApproverLevel!: FallbackAction | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
