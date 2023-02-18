export class AuthDTO {
  jwt!:string;

  constructor(jwt: string) {
    this.jwt = jwt;
  }
}
