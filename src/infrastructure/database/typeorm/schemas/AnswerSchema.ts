import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("answers")
export class AnswerSchema {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "workflow_id" })
  workflowId!: string;

  @Column({ name: "input_id" })
  inputId!: string;

  @Column({ name: "section_id" })
  sectionId!: string;

  @Column({ type: "text" })
  value!: string;

  @Column()
  order!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
