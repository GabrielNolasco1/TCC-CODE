import { randomUUID } from "node:crypto";

export enum InputType {
  TEXT = "text",
  LONGTEXT = "longtext",
  CNPJ = "cnpj",
  TEL = "tel",
  NUMBER = "number",
  EMAIL = "email",
  DATE = "date",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  SELECT = "select"
}
export enum InputStatus { ACTIVE = "ACTIVE", INACTIVE = "INACTIVE" }

export class Input {
  public id: string;
  public sectionId: string;
  public type: InputType;
  public question: string;
  public name: string;
  public order: number;
  public isRequired: boolean;
  public options: string[] | null;
  public cleanDelete: InputStatus;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: {
    id?: string;
    sectionId: string;
    type: InputType;
    question: string;
    name: string;
    order: number;
    isRequired: boolean;
    options?: string[] | null;
    cleanDelete?: InputStatus;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id ?? randomUUID();
    this.sectionId = props.sectionId;
    this.type = props.type;
    this.question = props.question;
    this.name = props.name;
    this.order = props.order;
    this.isRequired = props.isRequired;
    this.options = props.options ?? null;
    this.cleanDelete = props.cleanDelete ?? InputStatus.ACTIVE;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}
