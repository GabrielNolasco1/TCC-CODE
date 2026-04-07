export interface ITokenProvider {
  generate(userId: string, access: string): string;
}