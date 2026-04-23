import { TrabajadorModel } from './trabajador.model';

export interface ConductorModel  extends TrabajadorModel{
  placaVehiculo:string;
}
