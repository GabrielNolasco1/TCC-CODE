import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { AccessRole, ValidationStatus } from "@/domain/entities/User";
import { AreaSchema } from "@/infrastructure/database/typeorm/schemas/AreaSchema";

@Entity("users")
export class UserSchema {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ name: "password_hash" })
  passwordHash!: string;

  @Column({ name: "approval_level", default: 1 })
  approvalLevel!: number;

  @Column({ name: "area_id", type: "varchar", nullable: true })
  areaId!: string | null;

  @ManyToOne(() => AreaSchema)
  @JoinColumn({ name: "area_id" })
  area!: AreaSchema;

  @Column({ type: "enum", enum: AccessRole })
  access!: AccessRole;

  @Column({ type: "enum", enum: ValidationStatus })
  valid!: ValidationStatus;

  @Column({ name: "first_login", default: true })
  firstLogin!: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}