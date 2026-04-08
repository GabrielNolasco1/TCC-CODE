import { Input } from "../entities/Input";

export interface IInputRepository {
  findById(id: string): Promise<Input | null>;
  findBySectionId(sectionId: string): Promise<Input[]>;
  save(input: Input): Promise<Input>;
  inactivateBySectionId(sectionId: string): Promise<void>;
}
