import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from 'src/app/servicios/storage.service';
import { CreatePulicationModalComponent } from 'src/app/componentes/create-pulication-modal/create-pulication-modal.component';
import { PublicationService } from 'src/app/servicios/publication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentModalComponent } from 'src/app/componentes/comment-modal/comment-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private s_storage:StorageService,private dialog:MatDialog, private s_publication:PublicationService,private snackBar:MatSnackBar) { }
  showFiller:boolean = true;
  url_img:string="https://ui-avatars.com/api/?name=NN";
  fullname:string = 'Fernando Zhunio';
  name:string
  publication=[];
  ngOnInit(): void {
    if(this.s_storage.isAuthenticated()){
      let userClass = this.s_storage.getCurrentUser();
      let  user = userClass.fullname.replace(' ','+');
      this.url_img = "https://ui-avatars.com/api/?name="+user;
      this.fullname = userClass.fullname;
    }
    this.name = this.fullname.split(" ",1)[0];

    this.s_publication.index().subscribe(res=>{
      if(res.hasOwnProperty('data')){
        this.publication = res.data;
      }
      console.log(res);
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreatePulicationModalComponent,{
      data:{
        url_img:this.url_img,
        fullname:this.fullname

      },
      panelClass:['col-md-4','col-12'],
      width:'auto',
      maxWidth: "99%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
      if(result.description !=null || result.image!=null){
        let publish = "Publicando este nuevo contenido..."
        this.snackBar.open(publish)
        this.s_publication.store(result.description,result.image).subscribe(res=>{
          console.log(res);
          publish = 'Publicado'
          this.snackBar.open("Publicado","OK",{duration:2500})
        })
      }
    });
  }
}
