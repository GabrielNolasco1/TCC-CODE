import { randomUUID } from "node:crypto";

export enum WorkflowProgress {
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
  RETURNED = "RETURNED",
  CANCELED = "CANCELED"
}

export enum WorkflowStatus {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PENDING = "PENDING"
}

export class Workflow {
  public id: string;
  public creatorId: string;
  public solicitationId: string;
  public title: string;
  public progress: WorkflowProgress;
  public status: WorkflowStatus;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: {
    id?: string;
    creatorId: string;
    solicitationId: string;
    title: string;
    progress?: WorkflowProgress;
    status?: WorkflowStatus;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id ?? randomUUID();
    this.creatorId = props.creatorId;
    this.solicitationId = props.solicitationId;
    this.title = props.title;
    this.progress = props.progress ?? WorkflowProgress.IN_PROGRESS;
    this.status = props.status ?? WorkflowStatus.PENDING;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}
