/* eslint-disable @typescript-eslint/ban-types */
export class NestResponse {
  status: number;
  headers: Object;
  body: Object;

  constructor(response: NestResponse) {
    Object.assign(this, response);
  }
}
