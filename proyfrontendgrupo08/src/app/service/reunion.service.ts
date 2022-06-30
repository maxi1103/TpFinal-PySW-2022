import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reunion } from '../models/reunion';

@Injectable({
  providedIn: 'root'
})
export class ReunionService {
  hostBase: string;


  constructor(private _http: HttpClient) {
    this.hostBase= "http://localhost:3000/api/reunion/";
   }
   public addReunion(reunion:Reunion):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        }),
        params: new HttpParams({})
    };
    return this._http.post(this.hostBase,{
                                          fecha: reunion.fecha,
                                           horaInicio : reunion.horaInicio,
                                           horaFin : reunion.horaFin,
                                           oficina: reunion.oficina,
                                           estadoReunion: reunion.estadoReunion,
                                           tipoReunion: reunion.tipoReunion,
                                           recursos : reunion.recursos,
                                           participantes: reunion.participantes } ,httpOption);
   }

   public gerReuniones():Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
      })
    }
    return this._http.get(this.hostBase, httpOption);
   }

   public deleteReunion(_id:string):Observable<any>{
    const httpOptions ={
      header: new HttpHeaders({
      }),
      params: new HttpParams({})
    };
    return this._http.delete(this.hostBase+_id,httpOptions);
   }
   updateReunion(reunion:Reunion):Observable<any>{
    const httpOptions ={
      header: new HttpHeaders({
        'Content-Type':'application/json' 
      }),
      params: new HttpParams({})
    };
    return this._http.put(this.hostBase+reunion._id,{_id: reunion._id,fecha: reunion.fecha, 
                                                    horaInicio: reunion.horaInicio,horaFin: reunion.horaFin,
                                                    oficina:reunion.oficina, 
                                                    recursos: reunion.recursos, tipoReunion: reunion.tipoReunion,
                                                    estadoReunion: reunion.estadoReunion,
                                                    participantes: reunion.participantes},httpOptions);
  }

  getReunion(_id:string):Observable<any>{
    const httpOptions ={
      header: new HttpHeaders({
      }),
      params: new HttpParams({})
    };
    return this._http.get(this.hostBase+_id,httpOptions);
  }
}
