import { randomUUID } from "node:crypto";

export enum AccessRole {
  MASTER = "MASTER",
  ADMIN = "ADMIN",
  USER = "USER"
}

export enum ValidationStatus {
  VALID = "VALID",
  NOT_VALID = "NOT_VALID"
}

// src/domain/entities/User.ts
export class User {
  public id: string;
  public name: string;
  public email: string;
  public passwordHash: string;
  public approvalLevel: number;
  public access: AccessRole;
  public valid: ValidationStatus;
  public firstLogin: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public areaId: string | null;
  public areaName?: string;
  public isApproved: boolean;

  constructor(props: {
    id?: string;
    name: string;
    email: string;
    passwordHash: string;
    approvalLevel?: number;
    access?: AccessRole;
    valid?: ValidationStatus;
    firstLogin?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    areaId?: string | null;
    areaName?: string;
    isApproved?: boolean;
  }) {
    this.id = props.id ?? randomUUID();
    this.name = props.name;
    this.email = props.email;
    this.passwordHash = props.passwordHash;
    this.approvalLevel = props.approvalLevel ?? 1;
    this.access = props.access ?? AccessRole.USER;
    this.valid = props.valid ?? ValidationStatus.NOT_VALID;
    this.firstLogin = props.firstLogin ?? true;
    this.areaId = props.areaId ?? null;
    this.areaName = props.areaName;
    this.isApproved = props.isApproved ?? false;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}
