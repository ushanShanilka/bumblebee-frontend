import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent
} from "@angular/common/http";
import {ApprovalDialogComponent} from "../dialogs/approval-dialog/approval-dialog.component";
import {ApprovalDialogConfig} from "../dialogs/approval-dialog/ApprovalDialogConfig";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private dialog: MatDialog,
              private toasterService: ToastrService) { }

  handle(request: HttpRequest<any>,
         evt: HttpSentEvent | HttpHeaderResponse |
           HttpResponse<any> | HttpProgressEvent |
           HttpUserEvent<any>): void{
    if (evt instanceof HttpResponse) {
      if (request.method === 'GET'){
      }else {
        if (evt.body?.code === 202){
          this.handle_204(evt.body);//delete
        }else if (evt.body.code === 201){
          this.handle_201(evt.body);//save
        }else if(evt.body.code === 204){
          this.handle_203(evt.body);//update
        }
      }
    }
  }

  public handle_204(body: any): void {
    this.toasterService.info(body.message);
  }

  private handle_201(body: any): void {
    this.toasterService.success(body.message);
    // this.dialog.open(ApprovalDialogComponent, {
    //   width: '350px',
    //   // height: '200px',
    //   data: new ApprovalDialogConfig('Done', body.message, '')
    // });
  }

  private handle_203(body: any) {
    this.toasterService.success(body.message);
    //
    // this.dialog.open(ApprovalDialogComponent, {
    //   width: '350px',
    //   // height: '200px',
    //   data: new ApprovalDialogConfig('Done', body.message, '')
    // });
  }
}
