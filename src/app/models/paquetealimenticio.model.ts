import { PaqueteModel } from './paquete.model';

export interface PaquetealimenticioModel extends PaqueteModel {
  seEnviaHoy:boolean;
  tipoDeAlimento:string;

}
