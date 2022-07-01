import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/service/empleado.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  empleado!: Empleado;
  empleados!: Array<Empleado>;

  constructor(private empleadoService: EmpleadoService, private route: Router) {
    this.cargarEmpleados();
  }

  ngOnInit(): void {
  }

  agregarEmpleado() {
    this.route.navigate(['empleado-form', 0]);
  }

  modificarEmpleado(empleado: Empleado) {
    this.route.navigate(['empleado-form', empleado._id]);
  }

  eliminarEmpleado(empleado: Empleado) {
    this.empleadoService.deleteEmpleado(empleado._id).subscribe(
      result => {
        if (result.status == "1") {
          alert(result.msg);
          this.cargarEmpleados();
        }
      },
      error => {
        if (error.status == "0") {
          alert(error.msg);
        }
      })
  }

  cargarEmpleados() {
    this.empleados = new Array<Empleado>();
    this.empleadoService.getEmpleados().subscribe(
      result => {
        result.forEach((element: any) => {
          this.empleado = new Empleado();
          Object.assign(this.empleado, element);
          this.empleados.push(this.empleado);
        })
        console.log(this.empleados);
      }, 
      error => {
      }
    )
  }


}



