export class BaseHttpResponse {
  constructor(
    public readonly message: string,
    public readonly data: any = {},
    public readonly statusCode: number
  ) {}

  static success(message: string, data: any, statusCode = 200) {
    return new BaseHttpResponse(message, data, statusCode)
  }
}
