import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { EmpleadoFormComponent } from './components/empleado-form/empleado-form.component';
import { HomeComponent } from './components/home/home.component';
import { ReunionFormComponent } from './components/reunion-form/reunion-form.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent}, 
  {path:'home',component:HomeComponent},
  {path:'formEmpleado',component:EmpleadoFormComponent},
  {path:'formReunion',component:ReunionFormComponent},
  {path:'empleado',component:EmpleadoComponent},
  {path:'**',pathMatch:'full',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
