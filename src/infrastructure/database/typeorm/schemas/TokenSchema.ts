// src/infrastructure/database/typeorm/schemas/TokenSchema.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("tokens")
export class TokenSchema {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 8 }) 
  code!: string;

  @Column({ type: "varchar", name: "user_id" })
  userId!: string;

  @Column({ type: "timestamp", name: "expires_in" })
  expiresIn!: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}