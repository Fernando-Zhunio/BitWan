import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-pulication-modal',
  templateUrl: './create-pulication-modal.component.html',
  styleUrls: ['./create-pulication-modal.component.scss']
})
export class CreatePulicationModalComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data,public dialogRef: MatDialogRef<CreatePulicationModalComponent>) { }
  name:string;
  publication:string=null
  ngOnInit(): void {
    this.name = this.data.fullname.split(" ",1)
  }
  cardImageBase64:File=null;
  imageError:string;
  fileChangeEvent(fileInput):boolean{
    this.imageError = null;
        if (fileInput.target.files && fileInput.target.files[0]) {
            // Size Filter Bytes
            const max_size = 20971520;
            // const allowed_types = ['image/png', 'image/jpeg'];
            const max_height = 15200;
            const max_width = 25600;

            if (fileInput.target.files[0].size > max_size) {
                this.imageError =
                    'Maximum size allowed is ' + max_size / 1000 + 'Mb';
                return false;
            }

            // if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
            //     this.imageError = 'Only Images are allowed ( JPG | PNG )';
            //     return false;
            // }
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const image = new Image();
                image.src = e.target.result;
                image.onload = rs => {
                    const img_height = rs.currentTarget['height'];
                    const img_width = rs.currentTarget['width'];

                    console.log(img_height, img_width);


                    if (img_height > max_height && img_width > max_width) {
                        this.imageError =
                            'Maximum dimentions allowed ' +
                            max_height +
                            '*' +
                            max_width +
                            'px';
                        return false;
                    } else {
                        const imgBase64Path = e.target.result;
                        this.cardImageBase64 = imgBase64Path;
                        console.log(fileInput.target.files[0].name);
                        
                        // this.form_register.controls['image'].setValue(this.cardImageBase64);
                        // this.isImageSaved = true;
                        // this.previewImagePath = imgBase64Path;
                    }
                };
            };

            reader.readAsDataURL(fileInput.target.files[0]);
        }
        else{
          // this.form_register.controls['image'].setValue(null);
          this.cardImageBase64 = null;

        }

  }

  // test(){
  //   console.log(!this.publication , this.cardImageBase64==null);
  //   console.log(!this.publication && this.cardImageBase64==null);
    
  // }
  deleteImagen(){
    this.cardImageBase64 = null;
    console.log('fer');
    

  }

  upImage(){
    document.getElementById('publication_img').click();
  }

  closedDialog(){
    this.dialogRef.close({'description':this.publication,'image':this.cardImageBase64})
  }

}
