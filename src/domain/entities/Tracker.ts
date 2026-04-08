import { randomUUID } from "node:crypto";

export enum ApprovalResponse {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  RETURNED = "RETURNED"
}

export enum ApprovalRole {
  CREATOR = "CREATOR",
  REVIEW_LEADERSHIP = "REVIEW_LEADERSHIP",
  GENERAL_REVIEWER = "GENERAL_REVIEWER",
  FINAL_APPROVER = "FINAL_APPROVER"
}

export class Approval {
  public id: string;
  public workflowId: string;
  public userId: string;
  public response: ApprovalResponse;
  public order: number;
  public role: ApprovalRole;
  public message: string | null;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: {
    id?: string;
    workflowId: string;
    userId: string;
    response?: ApprovalResponse;
    order: number;
    role: ApprovalRole;
    message?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id ?? randomUUID();
    this.workflowId = props.workflowId;
    this.userId = props.userId;
    this.response = props.response ?? ApprovalResponse.PENDING;
    this.order = props.order;
    this.role = props.role;
    this.message = props.message ?? null;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}
