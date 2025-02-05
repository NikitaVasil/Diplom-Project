export class UserError extends Error {
  code: number;
  constructor(message: string, code: number = 404) {
      super(message);
      this.name = 'userError'
      this.code = code;
  }
}

export class TokenError extends Error {
  code: number;
  constructor(message: string, code: number = 401) {
      super(message);
      this.name = 'tokenError'
      this.code = code;
  }
}