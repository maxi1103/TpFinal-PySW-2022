import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoFormComponent } from './components/empleado-form/empleado-form.component';
import { HomeComponent } from './components/home/home.component';
import { ReunionFormComponent } from './components/reunion-form/reunion-form.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'formEmpleado',component:EmpleadoFormComponent},
  {path:'formReunion',component:ReunionFormComponent},
  {path:'**',pathMatch:'full',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
