import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  usuario!:Usuario;
  empleado!:Empleado;
  empleados!:Array<Empleado>;
  save:boolean=false;

  constructor(private router:Router, private usuarioService:UsuarioService) { 
    this.usuario=new Usuario();
    this.getEmpleados();
  }

  altaUsuario(){
    console.log(this.usuario.empleado);
    this.usuarioService.altaUsuario(this.usuario).subscribe(
      result=>{
        if(result.status=="1"){
          this.save=true;
          alert("Usuario creado correctamente!")
          this.router.navigate(['login']);
        }
      },
      error=>{
        if(error.status=="0"){
          this.save=false;
          console.log(error.msg);
        }
      }
    )
  }

  getEmpleados(){
    this.usuarioService.getEmpleados().subscribe(
      result=>{
        this.empleados=new Array<Empleado>();
        for(let i=0;i<result.length;i++){
          this.empleado=new Empleado();
          Object.assign(this.empleado,result[i]);
          this.empleados.push(this.empleado);
        }
        console.log(this.empleados);
      },
      error=>{

      }
    )
  }

  loginForm(){
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
  }

}
