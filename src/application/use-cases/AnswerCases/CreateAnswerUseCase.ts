import { Answer } from "@/domain/entities/Answer";
import { IAnswerRepository } from "@/domain/repositories/IAnswerRepository";
import { IInputRepository } from "@/domain/repositories/IInputRepository";
import { FieldValidator } from "@/domain/utils/FieldValidator";

export class CreateAnswerUseCase {
  constructor(
    private answerRepo: IAnswerRepository,
    private inputRepo: IInputRepository
  ) {}

  async execute(data: any): Promise<Answer> {
    const input = await this.inputRepo.findById(data.inputId);
    if (!input) throw new Error("Input not found.");


    if (input.isRequired && (!data.value || data.value.trim() === "")) {
      throw new Error(`The field "${input.question}" is required.`);
    }

    if (data.value && !FieldValidator.isValid(input.type, data.value)) {
      throw new Error(`Invalid format for ${input.type} in field "${input.question}".`);
    }

    if (["select", "radio"].includes(input.type) && input.options) {
      if (!input.options.includes(data.value)) {
        throw new Error(`Invalid option for field "${input.question}".`);
      }
    }

    const answer = new Answer({
      ...data,
      sectionId: input.sectionId
    });

    return await this.answerRepo.save(answer);
  }
}
