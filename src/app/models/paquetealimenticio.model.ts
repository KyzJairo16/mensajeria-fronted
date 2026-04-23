import { PaqueteModel } from './paquete.model';

export interface PaquetealimenticioModel extends PaqueteModel {
  seEnviaHoy:Boolean;
  tipoDeAlimento:string;

}
