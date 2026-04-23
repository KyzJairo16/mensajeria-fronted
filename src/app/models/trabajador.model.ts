import { UsuarioModel } from './usuario.model';

export interface TrabajadorModel extends UsuarioModel{
  turno: string;
}
