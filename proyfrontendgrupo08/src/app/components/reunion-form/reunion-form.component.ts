import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { Oficina } from 'src/app/models/oficina';
import { Recurso } from 'src/app/models/recurso';
import { Reunion } from 'src/app/models/reunion';
import { EmpleadoService } from 'src/app/service/empleado.service';
import { OficinaService } from 'src/app/service/oficina.service';
import { RecursoService } from 'src/app/service/recurso.service';
import { ReunionService } from 'src/app/service/reunion.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-reunion-form',
  templateUrl: './reunion-form.component.html',
  styleUrls: ['./reunion-form.component.css']
})
export class ReunionFormComponent implements OnInit {
 reunion: Reunion;
 participantes: Array<Empleado>=[];
 participantesAgregar: Array<Empleado>=[];
 recursosAgregar: Array<Recurso>=[];
 participante: Empleado;
 oficina: Oficina;
 recurso: Recurso;
 oficinas: Array<Oficina>=[];
 recursos: Array<Recurso>=[];
 reuniones: Array<Reunion>=[];
 reunionAux:Reunion;
 accion="";

  constructor(private oficinaService:OficinaService, private empleadoService:EmpleadoService,
              private recursoService:RecursoService,private reunionService:ReunionService,private activatedRoute:ActivatedRoute,private router:Router ) { 
    this.participantesAgregar= new Array<Empleado>();
    this.participantes= new Array<Empleado>();
    this.reunion= new Reunion();
    this.reunionAux= new Reunion();
    this.oficinas= new Array<Oficina>();
    this.recursos= new Array<Recurso>();
    this.participante= new Empleado();
    this.oficina= new Oficina();
    this.recurso= new Recurso();
    this.recursosAgregar= new Array<Recurso>();
    this.reuniones= new Array<Reunion>();
    
  }

  altaReunion(){
    this.reunion.participantes=this.participantesAgregar;
    this.reunion.recursos=this.recursosAgregar;
    this.reunion.estadoReunion="pendiente";
    
    ;
    if(this.comprobarParticipante()==false) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Colision de participantes!',
        showConfirmButton: false,
        timer: 1500
      });
    }else if(this.comprobarRecursos()==false){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Colision de recursos!',
        showConfirmButton: false,
        timer: 1500
      });
    }else if(this.comprobarOficinas()==false){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Colision de oficina!',
        showConfirmButton: false,
        timer: 1500
      });
    }else{

    this.reunionService.addReunion(this.reunion).subscribe(
      result=>{
        console.log(result);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Reunion creada correctamente!',
          showConfirmButton: false,
          timer: 1800
        });
        this.router.navigate(['tablaReunion']);
      },
      error=>{
        console.log(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No pudo crearse la reunion!',
          showConfirmButton: false,
          timer: 1800
        });
      }
    ) 
  }
  }
  //comprobar colision de participantes 2-i.
  comprobarParticipante():Boolean{
    var retornar=true;
    this.reuniones.forEach((element:Reunion)=>{
      element.participantes.forEach((elementt:Empleado)=>{
        this.reunion.participantes.forEach((elemnttt:Empleado)=>{
          if(element._id!=this.reunion._id){
          if(elementt._id==elemnttt._id ){
            if(element.fecha==this.reunion.fecha){
              if((this.convertirHora(this.reunion.horaInicio).getHours() > this.convertirHora(element.horaInicio).getHours()   || (this.convertirHora(this.reunion.horaInicio).getHours() == this.convertirHora(element.horaInicio).getHours() && this.convertirHora(this.reunion.horaInicio).getMinutes() >= this.convertirHora(element.horaInicio).getMinutes()))  /* hora*/&& (this.convertirHora(this.reunion.horaInicio).getHours() < this.convertirHora(element.horaFin).getHours() ||  (this.convertirHora(this.reunion.horaInicio).getHours() == this.convertirHora(element.horaFin).getHours() && this.convertirHora(this.reunion.horaInicio).getMinutes() <= this.convertirHora(element.horaFin).getMinutes()))){
                retornar=false;
              }else if((this.convertirHora(this.reunion.horaFin).getHours() < this.convertirHora(element.horaFin).getHours()   || (this.convertirHora(this.reunion.horaFin).getHours() == this.convertirHora(element.horaFin).getHours() && this.convertirHora(this.reunion.horaFin).getMinutes() <= this.convertirHora(element.horaFin).getMinutes()))  /* hora*/&& (this.convertirHora(this.reunion.horaFin).getHours() > this.convertirHora(element.horaInicio).getHours() ||  (this.convertirHora(this.reunion.horaFin).getHours() == this.convertirHora(element.horaInicio).getHours() && this.convertirHora(this.reunion.horaFin).getMinutes() >= this.convertirHora(element.horaInicio).getMinutes()))){
                retornar=false;
              }
            } 
          }
        }
        });
      });
    });
    return retornar;
  }
  //Comprobar los recursos
  comprobarRecursos():Boolean{ 
    var retornar=true;
    this.reuniones.forEach((element:Reunion)=>{
      element.recursos.forEach((elementt:Recurso)=>{
        this.reunion.recursos.forEach((elementp:Recurso)=>{
          if(element._id!=this.reunion._id){
          if(elementt._id==elementp._id && elementp.tipoRecurso=="Fisico"){
            if(element.fecha==this.reunion.fecha){
                if((this.convertirHora(this.reunion.horaInicio).getHours() > this.convertirHora(element.horaInicio).getHours()   || (this.convertirHora(this.reunion.horaInicio).getHours() == this.convertirHora(element.horaInicio).getHours() && this.convertirHora(this.reunion.horaInicio).getMinutes() >= this.convertirHora(element.horaInicio).getMinutes()))  /* hora*/&& (this.convertirHora(this.reunion.horaInicio).getHours() < this.convertirHora(element.horaFin).getHours() ||  (this.convertirHora(this.reunion.horaInicio).getHours() == this.convertirHora(element.horaFin).getHours() && this.convertirHora(this.reunion.horaInicio).getMinutes() <= this.convertirHora(element.horaFin).getMinutes()))){
                  retornar=false;
                }else if((this.convertirHora(this.reunion.horaFin).getHours() < this.convertirHora(element.horaFin).getHours()   || (this.convertirHora(this.reunion.horaFin).getHours() == this.convertirHora(element.horaFin).getHours() && this.convertirHora(this.reunion.horaFin).getMinutes() <= this.convertirHora(element.horaFin).getMinutes()))  /* hora*/&& (this.convertirHora(this.reunion.horaFin).getHours() > this.convertirHora(element.horaInicio).getHours() ||  (this.convertirHora(this.reunion.horaFin).getHours() == this.convertirHora(element.horaInicio).getHours() && this.convertirHora(this.reunion.horaFin).getMinutes() >= this.convertirHora(element.horaInicio).getMinutes()))){
                  retornar=false;
                }
              } 
          }
        }
        })
      });
    });
    return retornar;
  }
  //comprobar oficina
  comprobarOficinas():Boolean{
    var retornar=true;
    this.reuniones.forEach((element:Reunion)=>{
      if(element._id!=this.reunion._id){
      if(element.oficina._id==this.reunion.oficina._id){
        if(element.fecha==this.reunion.fecha){
          if((this.convertirHora(this.reunion.horaInicio).getHours() > this.convertirHora(element.horaInicio).getHours()   || (this.convertirHora(this.reunion.horaInicio).getHours() == this.convertirHora(element.horaInicio).getHours() && this.convertirHora(this.reunion.horaInicio).getMinutes() >= this.convertirHora(element.horaInicio).getMinutes()))  /* hora*/&& (this.convertirHora(this.reunion.horaInicio).getHours() < this.convertirHora(element.horaFin).getHours() ||  (this.convertirHora(this.reunion.horaInicio).getHours() == this.convertirHora(element.horaFin).getHours() && this.convertirHora(this.reunion.horaInicio).getMinutes() <= this.convertirHora(element.horaFin).getMinutes()))){
            retornar=false;
          }else if((this.convertirHora(this.reunion.horaFin).getHours() < this.convertirHora(element.horaFin).getHours()   || (this.convertirHora(this.reunion.horaFin).getHours() == this.convertirHora(element.horaFin).getHours() && this.convertirHora(this.reunion.horaFin).getMinutes() <= this.convertirHora(element.horaFin).getMinutes()))  /* hora*/&& (this.convertirHora(this.reunion.horaFin).getHours() > this.convertirHora(element.horaInicio).getHours() ||  (this.convertirHora(this.reunion.horaFin).getHours() == this.convertirHora(element.horaInicio).getHours() && this.convertirHora(this.reunion.horaFin).getMinutes() >= this.convertirHora(element.horaInicio).getMinutes()))){
            retornar=false;
          }
        }
      }
    }
    });
    return retornar;
  }
  getReuniones(){
    this.reunionService.gerReuniones().subscribe(
      result=>{
        result.forEach((element:any)=>{
          this.reunionAux= new Reunion();
          Object.assign(this.reunionAux,element);
          this.reuniones.push(this.reunionAux);
          this.reunionAux= new Reunion();
        });
      },
      error=>{
        console.log(error);
      }
    )
  }
  //Cargar los Participantes al formulario
  async getParticipantes(){
    this.empleadoService.getEmpleados().subscribe(
      result=>{
        result.forEach((element:any)=>{
          this.participante= new Empleado();
          Object.assign(this.participante,element);
          this.participantes.push(this.participante);
          this.participante= new Empleado();
          
        });
      },
      error=>{
        console.log(error);
      }
    )
  }
  //cargar las oficinas al formulario
  async getOficinas(){
    this.oficinaService.getOficinas().subscribe(
      result=>{
        result.forEach((element:any)=>{
          this.oficina= new Oficina();
          Object.assign(this.oficina,element);
          this.oficinas.push(this.oficina);
          this.oficina= new Oficina();
      
        });
      },
      error=>{
        console.log(error);
      }
    )
  }
  //cargar los recurosos al formulario
  async getRecursos(){
    this.recursoService.getRecursos().subscribe(
      result=>{
        result.forEach((element:any)=>{
          this.recurso= new Recurso();
          Object.assign(this.recurso,element);
          this.recursos.push(this.recurso);
          this.recurso= new Recurso();
      
        });
      },
      error=>{
        console.log(error);
      }
    )
  }
  
 
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params['id']==0){
        this.accion="new";
        this.getParticipantes();
        this.getOficinas();
        this.getRecursos();
        this.getReuniones();
      }else{   
       this.accion="update";
       this.getReuniones();
       this.obtenerReunion(params['id']);   
      }
    });
  }
  async obtenerReunion(_id:string){
    await this.getParticipantes();
    await this.getRecursos();
    await this.getOficinas();
    this.reunionService.getReunion(_id).subscribe(
      result=>{
        this.reunion= new Reunion();
        Object.assign(this.reunion,result);

        //Participantes en la reunion
        this.reunion.participantes.forEach((elementt:Empleado)=>{
          this.participante= new Empleado();
          Object.assign(this.participante,elementt);
          this.agregarParticipantes(this.participante);
          this.participante= new Empleado();
        });

        //Recursos en la reunion
        this.reunion.recursos.forEach((element:Recurso)=>{
          this.recurso= new Recurso();
          Object.assign(this.recurso,element);
          this.agregarRecursos(this.recurso);
          this.recurso= new Recurso();
        });

        //Oficina
        this.reunion.oficina= this.oficinas.find((item)=>(item._id==this.reunion.oficina._id))!;
      },
      error=>{
        console.log(error);
      }
    )
  };
  //cargar un array auxilar de los participantes a agregar a la reunion
  agregarParticipantes(part:Empleado){
    this.participantesAgregar.push(part);
    var index=-1;
    var c=0;
    this.participantes.forEach((element:Empleado)=>{
      if(part._id==element._id){
        index=c;
      }
      c++;
    });
    this.participantes.splice(index,1);
  }
  quitarParticipante(part:Empleado){
   
    this.participantesAgregar.splice(this.participantesAgregar.indexOf(part),1);
    this.participantes.push(part);
  }
 //cargar un array auxilar de los recursos a utilizar en la reunion
 agregarRecursos(recu:Recurso){
  this.recursosAgregar.push(this.recurso);
  var index=-1;
  var c=0
  this.recursos.forEach((element:Recurso)=>{  
    if(recu._id==element._id){
      index=c;
    }
    c++;
  });
  this.recursos.splice(index,1);
}
quitarRecursos(recu:Recurso){
  this.recursosAgregar.splice(this.recursosAgregar.indexOf(recu),1);
  this.recursos.push(recu);
}

convertirHora(hora:string):Date{
  const [hour,minute]= hora.split(':');
  var oe = new Date();
  oe.setHours(+hour);
  oe.setMinutes(+minute);
  return oe;
}
actualizarReunion(){
    this.reunion.participantes=this.participantesAgregar;
    this.reunion.recursos=this.recursosAgregar;
    this.reunion.estadoReunion="pendiente";
    if(this.comprobarParticipante()==false) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Colision de participantes!',
        showConfirmButton: false,
        timer: 1500
      });
    }else if(this.comprobarRecursos()==false){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Colision de recursos!',
        showConfirmButton: false,
        timer: 1500
      });
    }else if(this.comprobarOficinas()==false){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Colision de oficina!',
        showConfirmButton: false,
        timer: 1500
      });
    }else{

      
    this.reunionService.updateReunion(this.reunion).subscribe(
      result=>{
        console.log(result);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Reunion actualizada correctamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['tablaReunion']);
      },
      error=>{
        console.log(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No pudo actualizarse la reunion!',
          showConfirmButton: false,
          timer: 1500
        });
      }
    ) 
  }
}

}
