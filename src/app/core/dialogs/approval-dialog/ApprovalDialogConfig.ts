export type ApprovalDialog = 'Alert' | 'Confirm' | 'Error' | 'Delete' | 'Done' | 'Clear';

export class ApprovalDialogConfig {
  dialogType: ApprovalDialog;
  title = '';
  message = '';

  constructor(dialogType: ApprovalDialog, title: string, message: string) {
    this.dialogType = dialogType;
    this.title = title;
    this.message = message;
  }
}
