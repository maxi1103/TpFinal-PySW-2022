import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { Reunion } from 'src/app/models/reunion';
import { ReunionService } from 'src/app/service/reunion.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  reunion!:Reunion;
  reunion1!:Reunion;
  reuniones!:Array<Reunion>;
  reunionesemp!:Array<Reunion>;

  constructor(private reunionService:ReunionService,private usuarioService:UsuarioService,private router:Router) {
    if(usuarioService.userLoggedIn()==false){
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Por favor inicia sesion.',
      })
      router.navigate(['login']);
    } 
    this.getReuniones();
  }

  getReuniones(){
    this.reuniones=new Array<Reunion>();
    this.reunionService.gerReuniones().subscribe(
      result=>{
        result.forEach((element:any)=>{
          this.reunion= new Reunion();
          Object.assign(this.reunion,element);
          this.reuniones.push(this.reunion);
        });
        this.getReunionesporEmpleado();
      },
      error=>{
        console.log(error);
      }
    )
  }

  getReunionesporEmpleado(){
    this.reunionesemp=new Array<Reunion>();//Array auxiliar de reuniones
    this.reuniones.forEach((element:Reunion)=> {
      element.participantes.forEach((element2:Empleado)=> {
          if(element2._id==this.usuarioService.getIdEmp()){
            this.reunionesemp.push(element);
          }
      });
    });
  }

  ngOnInit(): void {
  }

}
