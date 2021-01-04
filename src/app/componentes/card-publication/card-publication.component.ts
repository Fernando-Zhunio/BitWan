import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PublicationService } from 'src/app/servicios/publication.service';
import { CommentModalComponent } from '../comment-modal/comment-modal.component';

@Component({
  selector: 'app-card-publication',
  templateUrl: './card-publication.component.html',
  styleUrls: ['./card-publication.component.scss']
})
export class CardPublicationComponent implements OnInit {

  @Input() data;
  @Input() fullname;
  isLike:boolean = false;
  constructor(private s_publication : PublicationService,private dialog:MatDialog,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  like(){
    this.isLike = !this.isLike
  }

  // commentPost(){
  //   this.s_publication.storeComment()
  // }

  openDialogCommnet(idpost) {
    const dialogRef = this.dialog.open(CommentModalComponent,{
      data:{
        // url_img:this.url_img,
        fullname:this.fullname

      },
      panelClass:['col-md-4','col-12'],
      width:'auto',
      maxWidth: "99%"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.description !=null){
        let publish = "Comentando esta la publicacion..."
        this.snackBar.open(publish)
        this.s_publication.storeComment(result.description,idpost).subscribe(res=>{
          console.log(res);
          publish = 'Comentando'
          this.snackBar.open("Comentado","OK",{duration:2500})
        })
      }
    });
  }

}
