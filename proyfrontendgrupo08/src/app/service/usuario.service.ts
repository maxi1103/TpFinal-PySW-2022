
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

 
  hostBase: string;
  urlBase:string;
  constructor(private _http : HttpClient) {
  this.urlBase="http://localhost:3000/api/";
  this.hostBase = "http://localhost:3000/api/usuario/";
  }
   
  public login(username: string, password: string):Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify({ username: username, password: password });
    console.log(body);
    return this._http.post(this.hostBase + 'login', body, httpOption);
  }

  public logout() {
    //borro el vble almacenado mediante el storage
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("perfil");
    sessionStorage.removeItem("userid");
  } 

  public userLoggedIn(){
      var resultado = false;
      var usuario = sessionStorage.getItem("user");
      if(usuario!=null){
        resultado = true;
      }
      return resultado;
    }

  public userLogged(){
    var usuario = sessionStorage.getItem("user");
    return usuario;
  }

  public idLogged(){
    var id = sessionStorage.getItem("userid");
    return id;
  }
   
  /**
   * Peticion GET para solicitar todos los empleados
   * @returns 
   */
   getEmpleados():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    };
    return this._http.get("http://localhost:3000/api/empleados",httpOptions);
  }

  /**
   * Peticion POST para dar de alta un Usuario
   * @param pasaje 
   * @returns 
   */
   altaUsuario(usuario:Usuario):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      }),
      params: new HttpParams({

      })
    };
    return this._http.post(this.hostBase,
                                          {
                                            username:usuario.username,
                                            password:usuario.password,
                                            nombres:usuario.nombres,
                                            apellido:usuario.apellido,
                                            perfil:usuario.perfil},httpOptions);
  }

}
