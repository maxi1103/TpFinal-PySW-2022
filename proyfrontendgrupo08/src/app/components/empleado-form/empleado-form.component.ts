import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dependencia } from 'src/app/models/dependencia';
import { Empleado } from 'src/app/models/empleado';
import { DependenciaService } from 'src/app/service/dependencia.service';
import { EmpleadoService } from 'src/app/service/empleado.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent implements OnInit {

  listaDependencias: Array<Dependencia>=new Array<Dependencia>();
  empleado!:Empleado;
  accion = "";

  constructor(private usuarioService:UsuarioService,
      private router:Router,
      private activatedRoute: ActivatedRoute,
      private dependenciaService: DependenciaService,
      private empleadoService:EmpleadoService) {
        if(usuarioService.userLoggedIn()==false){
          Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'Por favor inicia sesion.',
          })
          router.navigate(['login']);
        } 
  }

  altaEmpleado(){
    console.log(this.empleado);
    
    this.empleadoService.createEmpleado(this.empleado).subscribe(
      result => {
        console.log("1"+this.empleado);
        if (result.status == "1") {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Empleado creado correctamente!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['empleado'])
        }
      },
      error => {
        console.log("0"+this.empleado);
        if (error.status == "0") {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error al crear empleado',
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.id== "0") {
        this.accion = "new"; 
        this.iniciarEmpleado();
        //this.cargarDependencias();

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
            //this.empleado.Dependencias= this.listaDependencias.find(item => (item._id == this.empleado.Dependencias._id))!;
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


