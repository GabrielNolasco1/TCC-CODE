export interface ITokenGeneratorProvider {
  generate(length: number): string;
}