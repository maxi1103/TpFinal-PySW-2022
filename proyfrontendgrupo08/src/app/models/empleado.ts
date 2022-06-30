import { Dependencia } from "./dependencia";

export class Empleado {

    _id!:string;
    legajo!:number;
    apellido!:string;
    nombre!:string;
    email!:string;
    dependencias!:Dependencia;
    constructor(){
        
    }
}
