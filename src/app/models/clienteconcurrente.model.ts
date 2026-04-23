import { ClienteModel } from './cliente.model';

export interface ClienteconcurrenteModel extends ClienteModel {
  tarifaConcurrente:number;
}
