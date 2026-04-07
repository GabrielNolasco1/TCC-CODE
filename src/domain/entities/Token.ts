import { randomUUID } from "node:crypto";

export class Token {
  public id: string;
  public code: string;
  public userId: string;
  public expiresIn: Date;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: {
    id?: string;
    code: string;
    userId: string;
    expiresIn: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id ?? randomUUID();
    this.code = props.code;
    this.userId = props.userId;
    this.expiresIn = props.expiresIn; 
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}