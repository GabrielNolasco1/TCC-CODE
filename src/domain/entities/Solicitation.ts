import { randomUUID } from "node:crypto";

export enum SolicitationStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}

export class Solicitation {
  public id: string;
  public areaId: string;
  public name: string;
  public cleanDelete: SolicitationStatus;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: {
    id?: string;
    areaId: string;
    name: string;
    cleanDelete?: SolicitationStatus;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id ?? randomUUID();
    this.areaId = props.areaId;
    this.name = props.name;
    this.cleanDelete = props.cleanDelete ?? SolicitationStatus.ACTIVE;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}
