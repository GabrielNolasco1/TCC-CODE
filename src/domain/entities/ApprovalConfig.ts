import { randomUUID } from "node:crypto";

export enum FallbackAction {
  NO_CONTINUE = "NO_CONTINUE",
  CONTINUE = "CONTINUE",
  CHECK_ONE_MORE_LVL_AND_CONTINUE = "CHECK_ONE_MORE_LVL_AND_CONTINUE",
  CHECK_ONE_MORE_LVL_AND_NO_CONTINUE = "CHECK_ONE_MORE_LVL_AND_NO_CONTINUE"
}

export class ApprovalConfig {
  public id: string;
  public solicitationId: string;
  public necessaryApproverLevel: number | null;
  public ifNotHaveApproverLevel: FallbackAction | null;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: {
    id?: string;
    solicitationId: string;
    necessaryApproverLevel?: number | null;
    ifNotHaveApproverLevel?: FallbackAction | null;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id ?? randomUUID();
    this.solicitationId = props.solicitationId;
    this.necessaryApproverLevel = props.necessaryApproverLevel ?? null;
    this.ifNotHaveApproverLevel = props.ifNotHaveApproverLevel ?? null;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}
