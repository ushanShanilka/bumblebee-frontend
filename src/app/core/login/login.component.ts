import { Component, OnInit } from '@angular/core';
import {ApprovalDialogComponent} from "../dialogs/approval-dialog/approval-dialog.component";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import {AuthenticationRequestDTO} from "../dto/AuthenticationRequestDTO";
import {ApprovalDialogConfig} from "../dialogs/approval-dialog/ApprovalDialogConfig";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginDetailsForm!: UntypedFormGroup;

  apiResponse=false;
  constructor(private formBuilder:UntypedFormBuilder,
              private router: Router,
              private dialog:MatDialog,
              private authService:AuthService,
              private toster:ToastrService) { }

  ngOnInit(): void {
    this.loginDetailsForm=this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });
  }


  loginUser():void{
    if (this.loginDetailsForm.valid){
      this.apiResponse=true;
      this.authService.login(new AuthenticationRequestDTO(this.loginDetailsForm.get('username')?.value,this.loginDetailsForm.get('password')?.value)
      ).subscribe(res=>{
        this.apiResponse=false;
        if (res.code===200){
          this.router.navigateByUrl("/dashboard");
        }
      },error => {
        this.apiResponse=false;
      });
    }else {
      this.dialog.open(ApprovalDialogComponent, {
        width: '350px',
        data: new ApprovalDialogConfig('Error', 'Error!', 'Please Insert All Values Correctly')
      });
    }
  }

  clear(){
    this.loginDetailsForm.reset();
  }
}
