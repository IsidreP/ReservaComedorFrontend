import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss']
})
export class MatDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
    console.log("DATOS RECIBIDOS DEL PADRE: ", this.data);
  }

  onNoClicked(){
    this.dialogRef.close();
  }

  onYesClicked(){
    this.dialogRef.close({idPlato: this.data.idPlato})
  }

}
