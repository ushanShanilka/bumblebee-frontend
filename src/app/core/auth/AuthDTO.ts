export class AuthDTO {
  jwt!:string;
  userName:string;

  constructor(jwt: string, userName: string) {
    this.jwt = jwt;
    this.userName = userName;
  }
}
