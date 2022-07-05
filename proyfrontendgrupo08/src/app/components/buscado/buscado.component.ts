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

  buscarTitulo(){
    this.reunionService.gerReunionesTitulo(this.titulo).subscribe(
      result=>{
        alert(result);
      this.reunion=new Reunion();
      Object.assign(this.reunion,result);
      console.log(this.reunion);
      alert(this.reunion.titulo);
      },
      error=>{
        console.log(error);
      }
    )
  }
}
