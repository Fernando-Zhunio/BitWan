import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.scss']
})
export class CommentModalComponent implements OnInit {

  comment:string;
  name:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data,public dialogRef: MatDialogRef<CommentModalComponent>) { }

  ngOnInit(): void {
    this.name = this.data.fullname.split(" ",1)

  }

  closedDialog(){
    this.dialogRef.close({'description':this.comment})
  }

}
