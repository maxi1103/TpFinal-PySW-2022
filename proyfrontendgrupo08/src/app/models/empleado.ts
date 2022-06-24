import { Dependencia } from "./dependencia";

export class Empleado {

    _id!:string;
    empLegajo!:number;
    empApellido!:string;
    empNombre!:string;
    empEmail!:string;
    empDependencia!:Array<Dependencia>;

    constructor(){
        
    }
}
