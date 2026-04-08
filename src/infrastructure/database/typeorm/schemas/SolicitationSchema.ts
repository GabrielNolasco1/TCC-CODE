import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { SolicitationStatus } from "@/domain/entities/Solicitation";
import { AreaSchema } from "./AreaSchema";

@Entity("solicitations")
export class SolicitationSchema {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "area_id" })
  areaId!: string;

  @ManyToOne(() => AreaSchema)
  @JoinColumn({ name: "area_id" })
  area!: AreaSchema;

  @Column()
  name!: string;

  @Column({ type: "enum", enum: SolicitationStatus, name: "clean_delete" })
  cleanDelete!: SolicitationStatus;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
