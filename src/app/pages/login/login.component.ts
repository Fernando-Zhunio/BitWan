import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Session } from 'src/app/clases/session';
import { User } from 'src/app/clases/user';
import { LoginAndRegisterService } from 'src/app/servicios/login-and-register.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { SwalService } from 'src/app/servicios/swal.service';
// import { SnackBarService } from 'src/app/servicios/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('transition_login', [
      transition(':enter', [
        style({ transform: 'scale(0)', opacity: 0 }),
        animate(
          '700ms',
          style({ transform: 'scale(1)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1 }),
        animate(
          '700ms',
          style({ transform: 'scale(0)', opacity: 0 })
        ),
      ]),
    ]),
    trigger('transition_register', [
      transition(':enter', [
        style({ transform: 'scale(0)', opacity: 0 }),
        animate(
          '700ms',
          style({ transform: 'scale(1)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(1)', opacity: 1 }),
        animate(
          '700ms',
          style({ transform: 'scale(0)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  form_login: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    // applicantcode:new FormControl('749166')

  });
  // password	String	Si	La contraseña se codifica automáticamente a SHA256
  // nickname	String	Si	Alias del usuario.
  // fullname	String	No	Nombres del usuario.
  // birthdate	String	No	String con formato "YYYY/MM/DD".
  // image	String	No	Imagen del usuario en base64.
  // applicantcode	Number	Si	Código de aplicante.
  form_register: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    nickname: new FormControl('', [Validators.required]),
    fullname: new FormControl('', [Validators.required]),
    image: new FormControl(null),
    birthdate: new FormControl(null),
    // applicantcode:new FormControl(749166)
  });

  isSendLogin:boolean = false;
  isSendRegister:boolean = false;
  isLogin: boolean = true;
  isRegister:boolean = false;
  hide: boolean = true;
  minDate:Date;
  maxDate:Date;
  
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  constructor(private s_login_and_register: LoginAndRegisterService,private router: Router,private s_storage:StorageService) {}


  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 11, 31);
    this.maxDate = new Date(currentYear - 4, 11, 31);
    // SnackBarService.openSnackBar('hola','eerp');
  }

  login(): void {
    // alert('login');
    if(this.form_login.valid){
      this.isSendLogin = true;
      this.s_login_and_register.login(this.form_login.value).subscribe(
        res=>{
          this.isSendLogin = false;
          console.log(res);
          if(res.hasOwnProperty('code') && res.code == 200){
            // localStorage.setItem('token',res.data.token)
            let newSession = new Session();
            newSession.token = res.data.token;
            let newUser = new User()
            newUser.fullname = res.data.fullname;
            newUser.id = res.data.iduser;
            newUser.image = res.data.image;
            newUser.nickname = res.data.nickname;
            newSession.user = newUser;
            this.s_storage.setCurrentSession(newSession);
            this.router.navigate(['home'])
          }
          else{
            SwalService.swalToast('Error')
          }
        },err=>{
          this.isSendLogin = false;
          console.log(err);
        }
      )

      
    }
  }

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
                        
                        this.form_register.controls['image'].setValue(this.cardImageBase64);
                        this.isImageSaved = true;
                        // this.previewImagePath = imgBase64Path;
                    }
                };
            };

            reader.readAsDataURL(fileInput.target.files[0]);
        }
        else{
          this.form_register.controls['image'].setValue(null);

        }

  }

  register(): void {
    if(this.form_register.valid){
      this.isSendRegister = true;
      if(this.form_register.controls['birthdate'].value != null){
        let data_req = this.form_register.value;
        data_req.birthdate = formatDate(new Date(data_req.birthdate),'yyyy/MM/dd','en');
        console.log(this.form_register.value);
        console.log(data_req);
      }
      this.s_login_and_register.register(this.form_register.value).subscribe(res=>{
        this.isSendRegister = false;
        console.log(res);
      },err=>{
        this.isSendRegister = false;
        console.log(err);
        
      })
    }
    
    
  }

  removeImage():void{
    this.form_register.controls['image'].setValue(null);
  }

 

  delayHideLogin():void{
    this.isLogin = false;
    setTimeout(() => {
      this.isRegister = !this.isLogin
    }, 700);
  }

  delayHideRegister():void{
    this.isRegister = false;
    setTimeout(() => {
      this.isLogin = !this.isRegister
    }, 700);
  }
}
