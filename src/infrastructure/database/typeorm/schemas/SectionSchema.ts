import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { SectionStatus } from "@/domain/entities/Section";
import { SolicitationSchema } from "./SolicitationSchema";

@Entity("sections")
export class SectionSchema {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "solicitation_id" })
  solicitationId!: string;

  @ManyToOne(() => SolicitationSchema)
  @JoinColumn({ name: "solicitation_id" })
  solicitation!: SolicitationSchema;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column({ type: "enum", enum: SectionStatus, name: "clean_delete" })
  cleanDelete!: SectionStatus;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
