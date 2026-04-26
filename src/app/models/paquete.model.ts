export interface PaqueteModel {
  id:number;
  precioEnvio:number;
  direccionDestino:string;
  tamanio:string;
  fechaCreacionPedido:Date;
  fechaEstimadaEntrega:Date;
  ciudadDestino:string;
  estadoPedido:string;
  esPrioritario:boolean;
  precioFinal:number;
  idCliente:number;
}
