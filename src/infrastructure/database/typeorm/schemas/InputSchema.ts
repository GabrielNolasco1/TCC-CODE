import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { InputType, InputStatus } from "@/domain/entities/Input";
import { SectionSchema } from "./SectionSchema";

@Entity("inputs")
export class InputSchema {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "section_id" })
  sectionId!: string;

  @ManyToOne(() => SectionSchema)
  @JoinColumn({ name: "section_id" })
  section!: SectionSchema;

  @Column({ type: "enum", enum: InputType })
  type!: InputType;

  @Column()
  question!: string;

  @Column()
  name!: string;

  @Column()
  order!: number;

  @Column({ name: "is_required", default: false })
  isRequired!: boolean;

  @Column({ type: "json", nullable: true })
  options!: string[] | null;

  @Column({ type: "enum", enum: InputStatus, name: "clean_delete" })
  cleanDelete!: InputStatus;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
