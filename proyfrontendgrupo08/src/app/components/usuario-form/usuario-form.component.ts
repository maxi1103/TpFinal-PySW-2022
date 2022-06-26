import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  usuario!:Usuario;
  save:boolean=false;

  constructor(private router:Router, private usuarioService:UsuarioService) { 
    this.usuario=new Usuario();
  }

  altaUsuario(){
    this.usuarioService.altaUsuario(this.usuario).subscribe(
      result=>{
        if(result.status=="1"){
          this.save=true;
          console.log(result.msg);
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

  loginForm(){
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
  }

}
