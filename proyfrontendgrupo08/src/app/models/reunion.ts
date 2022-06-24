import { Oficina } from "./oficina"
import { Recurso } from "./recurso"

export class Reunion {
    fecha!:Date;
    horaInicio!:string;
    horaFin!:string;
    oficina!:Oficina
    recursos!:Array<Recurso>;
    tipoReunion!:string;
    estadoReunion!:string;

    constructor(){

    }
}
