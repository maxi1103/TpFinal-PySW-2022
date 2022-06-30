import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent implements OnInit {

  save:boolean=false;

  constructor(private usuarioService:UsuarioService, private router:Router) { 
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
    
  }

  ngOnInit(): void {
  }

}
