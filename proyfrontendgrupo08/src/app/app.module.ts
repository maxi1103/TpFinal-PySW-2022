import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpleadoFormComponent } from './components/empleado-form/empleado-form.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { ReunionFormComponent } from './components/reunion-form/reunion-form.component';
import { UsuarioService } from './service/usuario.service';
import { HeaderComponent } from './components/layout/header/header.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { SiNoPipe } from './pipes/si-no.pipe';
import { ReunionTablaComponent } from './components/reunion-tabla/reunion-tabla.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ResumenComponent } from './components/resumen/resumen.component';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { AgendaComponent } from './components/agenda/agenda.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    EmpleadoFormComponent,
    FooterComponent,
    HomeComponent,
    ReunionFormComponent,
    EmpleadoComponent,
    UsuarioFormComponent,
    CalendarioComponent,
    SiNoPipe,
    ReunionTablaComponent,
    UsuarioFormComponent,
    EstadisticasComponent,
    ResumenComponent,
    AgendaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FullCalendarModule,
    Ng2SearchPipeModule
  ],
  providers: [
    UsuarioService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true

    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
