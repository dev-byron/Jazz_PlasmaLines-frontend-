import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'nb-delete-confirm',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.scss']
})
export class DeleteConfirmationModalComponent {

  constructor(protected dialogRef: NbDialogRef<DeleteConfirmationModalComponent>) {
  }

  no() {
    this.dialogRef.close(false);
  }

  yes() {
    this.dialogRef.close(true);
  }

}