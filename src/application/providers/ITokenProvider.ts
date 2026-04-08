export interface ITokenProvider {
  generate(userId: string, access: string, areaId: string | null): string;
}
