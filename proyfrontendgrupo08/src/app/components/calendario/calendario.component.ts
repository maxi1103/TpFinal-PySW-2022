import { Component, OnInit } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import esLocale from '@fullcalendar/core/locales/es';
import { Empleado } from 'src/app/models/empleado';
import { Reunion } from 'src/app/models/reunion';
import { ReunionService } from 'src/app/service/reunion.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  calendar!: Calendar;
  reunion!:Reunion;
  reuniones!:Array<Reunion>;
  titulo!:string;
  inicio!:string;
  events:any=[];

  constructor(private reunionService:ReunionService, private usuarioService:UsuarioService) { 
    this.getReuniones();
  }

  getReuniones(){
    this.reunionService.gerReuniones().subscribe(
      result=>{
        for(let i=0;i<result.length;i++){
          this.events[i]={title:result[i].titulo, date:result[i].fecha, start:result[i].fecha+'T'+result[i].horaInicio, end:result[i].fecha+'T'+result[i].horaFin};
        }
        /* if(this.usuarioService.userPerfil()=="Administrador"){
          
        }else{
          var i=0;
          result.forEach((element:Reunion)=>{
            console.log(element)
            element.participantes.forEach((element2:Empleado)=>{
              if(element2._id==this.usuarioService.getIdEmp()){
                this.events[i]={title:result[i].titulo, date:result[i].fecha, start:result[i].fecha+'T'+result[i].horaInicio, end:result[i].fecha+'T'+result[i].horaFin};
                //console.log(this.events[i]);
              }
              
            })
            i++;
          })
          
        } */
        //Configuracion del calendario
        console.log(this.events);
        this.calendarOptions = {
          initialView: 'dayGridMonth',
          events: this.events,
          locale: esLocale,
          eventClick: this.handleDateClick.bind(this),
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }
        };
      },
      error=>{
        console.log(error);
      }
    )
  }

  calendarOptions: CalendarOptions={};

  config = {
    animated: true
  };

  ngOnInit(): void {

  }
  /**
   * Metodo para hacer algo cuando ckickeamos en un evento 
   * @param arg 
   */
  handleDateClick(arg:any){
    this.titulo = arg.event._def.title;
    this.inicio = arg.event.startStr;
    console.log("TITULO DEL EVENTO "+arg.event._def.title + " Inicia: "+this.inicio);
  }
}
