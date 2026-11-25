export class DomainError extends Error {
  public readonly code: string;

  constructor(message: string, code = "DOMAIN_ERROR") {
    super(message);
    this.name = new.target.name;
    this.code = code;
  }
}
