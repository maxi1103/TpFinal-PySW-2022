import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reunion } from 'src/app/models/reunion';
import { ReunionService } from 'src/app/service/reunion.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-reunion-tabla',
  templateUrl: './reunion-tabla.component.html',
  styleUrls: ['./reunion-tabla.component.css']
})
export class ReunionTablaComponent implements OnInit {

  reuniones:Array<Reunion>=[];
  reunion:Reunion;
  constructor(private reunionService:ReunionService,private route:Router) { 
    this.reuniones= new Array<Reunion>();
    this.reunion= new Reunion();  
    this.getReuniones();
  }

  ngOnInit(): void {
  }

  getReuniones(){
    this.reuniones=new Array<Reunion>();
    this.reunionService.gerReuniones().subscribe(
      result=>{
        result.forEach((element:any)=>{
          this.reunion= new Reunion();
          Object.assign(this.reunion,element);
          this.reuniones.push(this.reunion);
        });
      },
      error=>{
        console.log(error);
      }
    )
  }
  eliminarReunion(_id:string){
    Swal.fire({
      title: 'Estas seguro/a?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reunionService.deleteReunion(_id).subscribe(
          result=>{
            console.log(result);
            Swal.fire(
              'Eliminada!',
              'La reunion fue eliminada.',
              'success'
            );
            this.getReuniones();
          },
          error=>{
            console.log(error);
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Algo salio mal!',
              showConfirmButton: false,
              timer: 1500
            });
          }
        )
      }
    })
  }
  editarReunion(_id:string){
    this.route.navigate(['formReunion',_id]);
  }
  
  imprimirPDF(_id:string){
    this.route.navigate(['resumen',_id]);
  }
}
