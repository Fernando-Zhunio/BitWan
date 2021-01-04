import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeMainComponents, HomeRoutingModule } from './home.routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { CardPublicationComponent } from 'src/app/componentes/card-publication/card-publication.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [HomeComponent,HomeMainComponents,CardPublicationComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ]
})
export class HomeModule { }
