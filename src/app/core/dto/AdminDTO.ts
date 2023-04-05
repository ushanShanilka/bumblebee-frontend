export class AdminDTO{
  id:number;
  countryCode:string;
  birthDay:string;
  email:string;
  confirmEmail:string;
  firstName:string;
  lastName:string;
  phoneNumber:string;
  password:string;
  confirmPassword:string;
  status:number;

  constructor(id: number, countryCode: string, birthDay: string, email: string, confirmEmail: string, firstName: string, lastName: string, phoneNumber: string, password: string, confirmPassword: string, status: number) {
    this.id = id;
    this.countryCode = countryCode;
    this.birthDay = birthDay;
    this.email = email;
    this.confirmEmail = confirmEmail;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.status = status;
  }
}
