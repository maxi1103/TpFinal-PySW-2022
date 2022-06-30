import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dependencia } from 'src/app/models/dependencia';
import { Empleado } from 'src/app/models/empleado';
import { DependenciaService } from 'src/app/service/dependencia.service';
import { EmpleadoService } from 'src/app/service/empleado.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent implements OnInit {

  listaDependencias: Array<Dependencia>=new Array<Dependencia>();
  empleado!:Empleado;
  save:boolean=false;
  accion = "";

  constructor(private usuarioService:UsuarioService,
     private router:Router,
    private activatedRoute: ActivatedRoute,
    private dependenciaService: DependenciaService,
    private empleadoService:EmpleadoService) {

    if(!this.usuarioService.userLoggedIn()){
      alert("Debe validarse e ingresar su usuario y clave");
      this.router.navigate(['login']); 
    }else{
      if(this.usuarioService.userPerfil()!="Administrador"){
        alert("Acceso prohibido");
        this.router.navigate(['home']);
      }
    }
  }

  altaEmpleado(){
    this.empleadoService.createEmpleado(this.empleado).subscribe(
      result => {
        if (result.status == "1") {
          alert(result.msg);
          this.router.navigate(['empleado'])
        }
      },
      error => {
        if (error.status == "0") {
          alert(error.msg);
        }
      })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.id== "0") {
        this.accion = "new"; 
        this.iniciarEmpleado();
        this.cargarDependencias();

      } else {
        this.accion = "update";
        this.iniciarEmpleado();
        //this.cargarDependencias();
        this.cargarEmpleado(params.id);
      }
    });
  }

  async cargarDependencias() {
    this.listaDependencias = new Array<Dependencia>();
    this.dependenciaService.getDependencias().subscribe(
      result => {
        var unaDependencia = new Dependencia();
        result.forEach((element: any) => {
          Object.assign(unaDependencia, element);
          this.listaDependencias.push(unaDependencia);
          unaDependencia = new Dependencia();
        })
      })
  }

  actualizarEmpleado() {
    this.empleadoService.updateEmpleado(this.empleado).subscribe(
      result => {
        if (result.status == "1") {
          alert(result.msg);
        }
      },
      error => {
        if (error.status == "0") {
          alert(error.msg);
        }
      })
  }


  async cargarEmpleado(id: string) {
    //llamar al servicio de carga de dependencias
   await this.cargarDependencias();
  //llama al servicio para cargar un empleado
    this.empleadoService.getEmpleado(id).subscribe(
      result => {
        Object.assign(this.empleado, result);
      console.log(result);
            this.empleado.dependencias= this.listaDependencias.find(item => (item._id == this.empleado.dependencias._id))!;
          },
      error => {
        console.log(error);
        alert("error");
      });
  }

  cerrar() {
    this.router.navigate(['empleado']);
  }

  iniciarEmpleado() {
    this.empleado = new Empleado();
  }


}


