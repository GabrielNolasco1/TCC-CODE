import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { SolicitationSchema } from "./SolicitationSchema";

@Entity("approval_flows")
export class ApprovalFlowSchema {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "solicitation_id" })
  solicitationId!: string;

  @ManyToOne(() => SolicitationSchema)
  @JoinColumn({ name: "solicitation_id" })
  solicitation!: SolicitationSchema;

  @Column({ name: "user_id" })
  userId!: string;

  @Column()
  order!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
