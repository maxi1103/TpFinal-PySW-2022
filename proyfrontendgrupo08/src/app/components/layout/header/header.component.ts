import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public loginService: UsuarioService,private router: Router) { 

  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
  }
  usuarioForm(){
    this.router.navigate(['formUsuario']);
  }
  login(){
    this.router.navigate(['login']);
  }
}
