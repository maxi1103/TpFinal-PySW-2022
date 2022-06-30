import { Component, OnInit } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import esLocale from '@fullcalendar/core/locales/es';
import { Reunion } from 'src/app/models/reunion';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  calendar!: Calendar;
  reunion!:Reunion;
  reuniones!:Array<Reunion>;

  //Array de eventos
  events: any = [
    {id:'1',title: 'Evento 1', date: '2022-06-22', color: '#5BE826'},
    {id:'2',title: 'Evento 2', date: '2022-06-23', color: '#E26D32'},
    {id:'3',title: 'Evento 3', date: '2022-06-24', color: '#CA2147'}
  ]

  calendarOptions: CalendarOptions = {
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

  config = {
    animated: true
  };

  titulo!:string;
  inicio!:string;
  

  constructor() { }

  ngOnInit(): void {

  }

  handleDateClick(arg:any){
    this.titulo = arg.event._def.title;
    this.inicio = arg.event.startStr;
    console.log("TITULO DEL EVENTO "+arg.event._def.title + " Inicia: "+this.inicio);
  }

  /* getReuniones(){
    this.reunionService.getReuniones().subscribe(
      result=>{
        this.reuniones=new Array<Reunion>();
        for(let i=0;i<result.length;i++){
          this.reunion=new Reunion();
          this.events=[ 
            {id:result[i]._id,title:result[i].titulo,date:result[i].fecha,startTime:result[i].horaInicio,endTime:result[i].horaFin}
          ];

          Object.assign(this.reunion,result[i]);
          this.reuniones.push(this.reunion);
        }
        console.log(this.reuniones);
      },
      error=>{

      }
    )
  } */

}
