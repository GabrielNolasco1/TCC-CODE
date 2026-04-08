import { randomUUID } from "node:crypto";

export class ApprovalFlow {
  public id: string;
  public solicitationId: string;
  public userId: string;
  public order: number;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: {
    id?: string;
    solicitationId: string;
    userId: string;
    order: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id ?? randomUUID();
    this.solicitationId = props.solicitationId;
    this.userId = props.userId;
    this.order = props.order;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}
