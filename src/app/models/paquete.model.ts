export interface PaqueteModel {
  id:number;
  precioEnvio:number;
  direccionDestino:string;
  tamanio:string;
  fechaCreacionPedido:Date;
  fechaEstimadaEntrega:Date;
}
