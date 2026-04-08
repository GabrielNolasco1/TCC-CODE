import { Input } from "@/domain/entities/Input";
import { InputSchema } from "../schemas/InputSchema";

export class InputMapper {
  static toDomain(schema: InputSchema): Input {
    return new Input({
      id: schema.id,
      sectionId: schema.sectionId,
      type: schema.type,
      question: schema.question,
      name: schema.name,
      order: schema.order,
      isRequired: schema.isRequired,
      options: schema.options,
      cleanDelete: schema.cleanDelete,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt
    });
  }

  static toPersistence(input: Input): Partial<InputSchema> {
    return {
      id: input.id,
      sectionId: input.sectionId,
      type: input.type,
      question: input.question,
      name: input.name,
      order: input.order,
      isRequired: input.isRequired,
      options: input.options,
      cleanDelete: input.cleanDelete
    };
  }
}
