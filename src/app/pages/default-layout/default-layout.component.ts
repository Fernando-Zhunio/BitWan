import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePulicationModalComponent } from 'src/app/componentes/create-pulication-modal/create-pulication-modal.component';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

  constructor(private s_storage:StorageService,public dialog:MatDialog) { }

  url_img:string="https://ui-avatars.com/api/?name=NN";
  fullname:string = 'Fernando Zhunio';
  ngOnInit(): void {
    if(this.s_storage.isAuthenticated()){
      let userClass = this.s_storage.getCurrentUser();
      let  user = userClass.fullname.replace(' ','+');
      this.url_img = "https://ui-avatars.com/api/?name="+user;
      this.fullname = userClass.fullname;
    }
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
      console.log(`Dialog result: ${result}`);
    });
  }

  closeSession(){
    this.s_storage.logout();
  }

}
