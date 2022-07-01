import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { EmpleadoFormComponent } from './components/empleado-form/empleado-form.component';
import { HomeComponent } from './components/home/home.component';
import { ReunionFormComponent } from './components/reunion-form/reunion-form.component';
import { ReunionTablaComponent } from './components/reunion-tabla/reunion-tabla.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { ResumenComponent } from './components/resumen/resumen.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path:'formUsuario', component:UsuarioFormComponent}, 
  {path:'home',component:HomeComponent},
  {path:'formEmpleado',component:EmpleadoFormComponent},
  {path:'formReunion',component:ReunionFormComponent},
  {path:'calendario', component:CalendarioComponent},
  {path:'formReunion/:id',component:ReunionFormComponent},
  {path:'tablaReunion',component:ReunionTablaComponent},
  {path:'resumen/:id',component:ResumenComponent},
  {path:'**',pathMatch:'full',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
