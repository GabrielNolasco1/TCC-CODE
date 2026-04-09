export class FieldValidator {
  static isValid(type: string, value: string): boolean {
    if (!value) return true;

    switch (type) {
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      case "cnpj":
        const cleanCNPJ = value.replace(/[^\d]/g, "");
        return cleanCNPJ.length === 14;

      case "tel":
        const cleanTel = value.replace(/[^\d]/g, "");
        return cleanTel.length >= 10 && cleanTel.length <= 11;

      case "number":
        return !isNaN(Number(value));

      case "date":
        return !isNaN(Date.parse(value));

      default:
        return true;
    }
  }
}
