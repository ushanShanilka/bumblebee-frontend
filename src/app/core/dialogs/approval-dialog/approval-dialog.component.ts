import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApprovalDialogConfig} from "./ApprovalDialogConfig";

@Component({
  selector: 'app-approval-dialog',
  templateUrl: './approval-dialog.component.html',
  styleUrls: ['./approval-dialog.component.scss']
})
export class ApprovalDialogComponent implements OnInit {

  style = 'confirm';
  dialogType: string;
  title = '';
  message: string;
  btnAccept = '';
  btnUnaccepted = '';
  image: any;

  constructor(public dialogRef: MatDialogRef<ApprovalDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ApprovalDialogConfig) {
    this.dialogType = data.dialogType;
    this.title = data.title;
    this.message = data.message;


    if (this.dialogType === 'Alert') {
      this.image = 'assets/img/Alerts/cancel.png';
      this.btnAccept = 'OK';
      this.style = 'alerts';
    } else if (this.dialogType === 'Delete') {
      this.image = 'assets/img/Alerts/exclamation-mark.png';
      this.btnAccept = 'Yes';
      this.btnUnaccepted = 'No';
      this.style = 'delete';
    } else if (this.dialogType==='Confirm') {
      this.image = 'assets/img/Alerts/1636047.png';
      this.btnAccept = 'Yes';
      this.btnUnaccepted = 'No';
      this.style = 'confirm';
    } else if (this.dialogType === 'Error') {
      this.image = 'assets/img/Alerts/exclamation-mark.png';
      this.btnAccept = 'OK';
      this.style = 'error';
    } else if (this.dialogType === 'Done') {
      this.image = 'assets/img/Alerts/checked.png';
      this.style = 'done';
      this.btnAccept = 'OK';
    }else if (this.dialogType === 'Clear') {
      this.image = 'assets/img/Alerts/exclamation-mark.png';
      this.btnAccept = 'Yes';
      this.btnUnaccepted = 'No';
      this.style = 'creal';
    }
  }

  ngOnInit(): void {

  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
