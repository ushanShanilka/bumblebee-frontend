import { Component, OnInit } from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../core/auth/auth.service";
import {Observable} from "rxjs";
import {RegisterDTO} from "../../../../core/dto/RegisterDTO";
import {AdminDTO} from "../../../../core/dto/AdminDTO";
import {AdminService} from "../../../../core/service/admin.service";

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent implements OnInit {

  formMode: 'CREATE' | 'UPDATE' = 'CREATE';
  adminForm!: UntypedFormGroup;
  apiResponse = false;

  selectedAdmin = new AdminDTO(
    0,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    0,
  );

  constructor(private toasterService: ToastrService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authService:AuthService,
              private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      confirmEmail: ['', Validators.required],
      password: ['', ],
      confirmPassword: ['', ],
      countryCode: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      active: [false, ],
    });

    this.activatedRoute.params.subscribe(async parems => {
      if (parems.hasOwnProperty('id')) {
        let res = await this.adminService.getById(Object.values(parems)[0]);

        this.selectedAdmin = res.data

        this.adminForm.get('firstName')?.setValue(this.selectedAdmin.firstName)
          this.adminForm.get('lastName')?.setValue(this.selectedAdmin.lastName)
          this.adminForm.get('email')?.setValue(this.selectedAdmin.email)
          this.adminForm.get('dateOfBirth')?.setValue(this.selectedAdmin.birthDay)
          this.adminForm.get('confirmEmail')?.setValue(this.selectedAdmin.email)
          this.adminForm.get('countryCode')?.setValue(this.selectedAdmin.countryCode)
          this.adminForm.get('phoneNumber')?.setValue(this.selectedAdmin.phoneNumber)

        if (this.selectedAdmin.status == 1){
          this.adminForm.get('active')?.setValue(true)
        }

        this.formMode = 'UPDATE';
      }
    })
  }

  onAction() {
    if (this.adminForm.valid){
      this.apiResponse = true;
      let sub: Observable<any>;
      if (this.formMode === 'CREATE') {
        sub = this.create();
      } else {
        sub = this.update();
      }
      sub.subscribe(res => {
        this.apiResponse = false;
        if (res.code === 201 || res.code === 204) {
          this.adminForm.reset();
          if (this.formMode=="UPDATE"){
            this.router.navigate(['..'], { relativeTo: this.activatedRoute })
          }else {
            this.router.navigate(['../all'], { relativeTo: this.activatedRoute })
          }
        }
      }, error => {
        console.log(error)
        this.apiResponse = false;
      })
    }else {
      this.adminForm.markAllAsTouched()
      this.toasterService.error("required fields missing")
    }
  }

  clear() {

  }

  cancel() {

  }


  create(): Observable<any> {
    return this.authService.createAdmin(new RegisterDTO(
      this.adminForm.get('firstName')?.value,
      this.adminForm.get('lastName')?.value,
      this.adminForm.get('email')?.value,
      this.adminForm.get('dateOfBirth')?.value,
      this.adminForm.get('confirmEmail')?.value,
      '',
      this.adminForm.get('address')?.value,
      this.adminForm.get('password')?.value,
      this.adminForm.get('confirmPassword')?.value,
      this.adminForm.get('countryCode')?.value,
      this.adminForm.get('phoneNumber')?.value,
      this.adminForm.get('active')?.value == true? 1 : 2
    ));
  }

  update(): Observable<any> {
    return this.adminService.update(new AdminDTO(
      this.selectedAdmin.id,
      this.adminForm.get('countryCode')?.value,
      this.adminForm.get('dateOfBirth')?.value,
      this.adminForm.get('email')?.value,
      this.adminForm.get('confirmEmail')?.value,
      this.adminForm.get('firstName')?.value,
      this.adminForm.get('lastName')?.value,
      this.adminForm.get('phoneNumber')?.value,
      this.adminForm.get('password')?.value,
      this.adminForm.get('confirmPassword')?.value,
      this.adminForm.get('active')?.value == true? 1 : 2
    ));
  }
}
