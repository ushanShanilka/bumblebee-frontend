import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ApprovalDialogComponent} from "../dialogs/approval-dialog/approval-dialog.component";
import {ApprovalDialogConfig} from "../dialogs/approval-dialog/ApprovalDialogConfig";
import {AuthService} from "../auth/auth.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private dialog: MatDialog,
              private authService:AuthService,
              private toasterService: ToastrService
  ) { }

  handle(request: any, error: any): void {
    console.log(error)
    console.log(error.status === 404 )
    console.log(error.status >= 404 && (error.status>500))
    if (error.status === 400){
      this.handle_400(error);
    }else if (error.status === 401){
      this.handle_401(error);
    }else if (error.status === 404){
      this.handle_404(request,error);
    }else if (error.status === 500){
      this.handle_500(error);
    } else{
      this.handleDefault(error);
    }
  }
  private handle_400(error: any): void {
    this.toasterService.error(error.error.message);

    // this.dialog.open(ApprovalDialogComponent, {
    //   width: '350px',
    //   // height: '200px',
    //   data: new ApprovalDialogConfig('Error', error.error.message, 'Try Again !')
    // });
  }
  private handle_404(request: any, error: any): void {

    if (request.responseType === "arraybuffer") {
      var enc:any = new TextDecoder("utf-8");
      var arr = new Uint8Array(error.error);
      let parse = JSON.parse(enc.decode(arr));
      // this.dialog.open(ApprovalDialogComponent, {
      //   width: '350px',
      //   // height: '200px',
      //   data: new ApprovalDialogConfig('Error', parse?.message, parse?.data?parse?.data:'Try Again !')
      // });
      this.toasterService.error(parse?.data?parse?.data:'Try Again !');

    }else {
      // this.dialog.open(ApprovalDialogComponent, {
      //   width: '350px',
      //   // height: '200px',
      //   data: new ApprovalDialogConfig('Error', error.error.message, error.error.data?error.error.data:'Try Again !')
      // });

      this.toasterService.error(error.error.data?error.error.data:'Try Again !');

    }

  }
  private handle_401(error: any): void {
    this.toasterService.error("Unauthorized Access");
    //
    // this.dialog.open(ApprovalDialogComponent, {
    //   width: '450px',
    //   // height: '200px',
    //   data: new ApprovalDialogConfig('Error', "Error", "Unauthorized Access"  )
    // }).afterClosed().subscribe(res=>{
    //   this.authService.logout();
    // });
  }
  private handle_500(error: any): void {
    this.toasterService.error(error.error.error);

    // this.dialog.open(ApprovalDialogComponent, {
    //   width: '350px',
    //   // height: '200px',
    //   data: new ApprovalDialogConfig('Error', 'Error!', error.error.error)
    // });
  }
  private handleDefault(error: any): void {
    this.toasterService.error("Please Try Again Shortly!");

    // this.dialog.open(ApprovalDialogComponent, {
    //   width: '350px',
    //   // height: '200px',
    //   data: new ApprovalDialogConfig('Error', 'Error!', 'Please Try Again Shortly!')
    // });
  }
}
