import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CategoriasMainComponent } from './categorias-main.component';
import { Component } from '@angular/core';
import { HomeComponent } from './home.component';
// import { MarcasCreateOrEditComponent } from './marcas-create-or-edit/marcas-create-or-edit.component';
// import { MarcasComponent } from './marcas.component';

@Component({
  selector: 'app-home',
  template: '<router-outlet></router-outlet>',
  
})
export class HomeMainComponents  {
}


const routes: Routes = [
  {
    path: '',
    component:HomeMainComponents,
    children: [
      {
        path: '',
        component: HomeComponent ,
      },
    //   {
    //     path: 'create',
    //     component: MarcasCreateOrEditComponent,
    //     data:{isEdit:false}
    //   },
    //   {
    //     path: 'edit/:id',
    //     component: MarcasCreateOrEditComponent,
    //     data:{isEdit:true}
    //   },     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
