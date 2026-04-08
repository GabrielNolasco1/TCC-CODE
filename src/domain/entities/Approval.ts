import { randomUUID } from "node:crypto";

export enum ApprovalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}

export class Approval {
  public id: string;
  public workflowId: string;
  public approverId: string;
  public status: ApprovalStatus;
  public order: number;
  public comments: string | null;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: {
    id?: string;
    workflowId: string;
    approverId: string;
    status?: ApprovalStatus;
    order: number;
    comments?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id ?? randomUUID();
    this.workflowId = props.workflowId;
    this.approverId = props.approverId;
    this.status = props.status ?? ApprovalStatus.PENDING;
    this.order = props.order;
    this.comments = props.comments ?? null;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}
