import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reunion } from 'src/app/models/reunion';
import { ReunionService } from 'src/app/service/reunion.service';

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
    this.reunionService.deleteReunion(_id).subscribe(
      result=>{
        console.log(result);
        console.log("Eliminado");
      },
      error=>{
        console.log(error);
      }
    )
  }
  editarReunion(_id:string){
    this.route.navigate(['formReunion',_id]);
  }
  
  imprimirPDF(_id:string){
    this.route.navigate(['resumen',_id]);
  }
}
