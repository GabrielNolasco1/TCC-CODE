import { randomUUID } from "node:crypto";

export class Area {
  public id: string;
  public name: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: {
    id?: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id ?? randomUUID();
    this.name = props.name;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}