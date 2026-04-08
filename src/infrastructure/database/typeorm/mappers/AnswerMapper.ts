import { Answer } from "@/domain/entities/Answer";
import { AnswerSchema } from "../schemas/AnswerSchema";

export class AnswerMapper {
  static toDomain(schema: AnswerSchema): Answer {
    return new Answer({
      id: schema.id,
      workflowId: schema.workflowId,
      inputId: schema.inputId,
      sectionId: schema.sectionId,
      value: schema.value,
      order: schema.order,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt
    });
  }

  static toPersistence(answer: Answer): Partial<AnswerSchema> {
    return {
      id: answer.id,
      workflowId: answer.workflowId,
      inputId: answer.inputId,
      sectionId: answer.sectionId,
      value: answer.value,
      order: answer.order,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt
    };
  }
}
