import { randomUUID } from "node:crypto";

export class Answer {
  public id: string;
  public workflowId: string;
  public inputId: string;
  public sectionId: string;
  public value: string;
  public order: number;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: {
    id?: string;
    workflowId: string;
    inputId: string;
    sectionId: string;
    value: string;
    order: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id ?? randomUUID();
    this.workflowId = props.workflowId;
    this.inputId = props.inputId;
    this.sectionId = props.sectionId;
    this.value = props.value;
    this.order = props.order;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}
