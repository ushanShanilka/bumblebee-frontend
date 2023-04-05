export class RegisterDTO{
  firstName:string;
  lastName:string;
  email:string;
  dateOfBirth:string;
  confirmEmail:string;
  nic:string;
  address:string;
  password:string;
  confirmPassword:string;
  countryCode:string;
  phoneNumber:string;
  status:number;

  constructor(firstName: string, lastName: string, email: string, dateOfBirth: string, confirmEmail: string, nic: string, address: string, password: string, confirmPassword: string, countryCode: string, phoneNumber: string, status: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.confirmEmail = confirmEmail;
    this.nic = nic;
    this.address = address;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.countryCode = countryCode;
    this.phoneNumber = phoneNumber;
    this.status = status;
  }
}
