import { UsuarioModel } from './usuario.model';

export interface ClienteModel extends UsuarioModel{
  metodoPago: string;
  tipoPedidos: string;
  contrasenia: string;
}
