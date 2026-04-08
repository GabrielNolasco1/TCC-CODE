import { randomUUID } from "node:crypto";

export enum SectionStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}

export class Section {
  public id: string;
  public solicitationId: string;
  public title: string;
  public order: number;
  public cleanDelete: SectionStatus;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: {
    id?: string;
    solicitationId: string;
    title: string;
    order: number;
    cleanDelete?: SectionStatus;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id ?? randomUUID();
    this.solicitationId = props.solicitationId;
    this.title = props.title;
    this.order = props.order;
    this.cleanDelete = props.cleanDelete ?? SectionStatus.ACTIVE;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}
