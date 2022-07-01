import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent implements OnInit {

  save:boolean=false;

  constructor(private usuarioService:UsuarioService, private router:Router) { 
    if(!this.usuarioService.userLoggedIn()){
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Necesita iniciar sesion!'
      })
      this.router.navigate(['login']); 
    }else{
      if(this.usuarioService.userPerfil()!="Administrador"){
        Swal.fire({
          icon: 'error',
          title: 'Acceso Prohibido...',
          text: 'No tiene los permisos necesarios!'
        })
        this.router.navigate(['home']);
      }
    }
  }

  altaEmpleado(){
    
  }

  ngOnInit(): void {
  }

}
