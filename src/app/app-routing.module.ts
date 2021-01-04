import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthReverseGuard } from './guards/auth-reverse-guard.guard';
import { AuthGuard } from './guards/auth.guard';
import { DefaultLayoutComponent } from './pages/default-layout/default-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { P404Component } from './pages/p404/p404.component';
import { P500Component } from './pages/p500/p500.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    },
    canActivate:[AuthReverseGuard]
    
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    },
    canActivate:[AuthReverseGuard]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate:[AuthGuard],
    children:[
      {
        path:'home',
        loadChildren:()=> import('./pages/home/home.module').then(m=>m.HomeModule)
      }
    ]
 
},
{ path: '**', component: P404Component }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
