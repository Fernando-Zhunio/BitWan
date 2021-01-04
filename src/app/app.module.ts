import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { P500Component } from './pages/p500/p500.component';
import { P404Component } from './pages/p404/p404.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DefaultLayoutComponent } from './pages/default-layout/default-layout.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule  } from "@angular/material/input";
import {MatIconModule  } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomInterceptor } from './interceptors/custom.interceptor';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { CreatePulicationModalComponent } from './componentes/create-pulication-modal/create-pulication-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CommentModalComponent } from './componentes/comment-modal/comment-modal.component';
// import { CardPublicationComponent } from './componentes/card-publication/card-publication.component';

// import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    P500Component,
    P404Component,
    LoginComponent,
    RegisterComponent,
    DefaultLayoutComponent,
    CreatePulicationModalComponent,
    CommentModalComponent,
    // CardPublicationComponent,
    // HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule, MatNativeDateModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,
    useClass:CustomInterceptor,
    multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
