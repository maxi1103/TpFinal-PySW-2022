import { Component, OnInit } from '@angular/core';
import { Reunion } from 'src/app/models/reunion';
import { ReunionService } from 'src/app/service/reunion.service';

@Component({
  selector: 'app-buscado',
  templateUrl: './buscado.component.html',
  styleUrls: ['./buscado.component.css']
})
export class BuscadoComponent implements OnInit {
titulo!:string;
reunion!:Reunion;
reuniones!:Array<Reunion>;
  constructor(private reunionService:ReunionService) {
    this.reunion=new Reunion();
  }

  ngOnInit(): void {
  }

  async buscarTitulo(){
    this.reuniones= new Array<Reunion>();
    this.reunionService.gerReunionesTitulo(this.titulo).subscribe(
      result=>{
        result.forEach((element:Reunion)=>{
          this.reunion=new Reunion();
          Object.assign(this.reunion,element);
          this.reuniones.push(this.reunion);
        });
        

      },
      error=>{
        console.log(error);
      }
    )

   
  }
}
