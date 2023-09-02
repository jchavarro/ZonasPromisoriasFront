import { Productor } from './productor';

export class FincaRequest {
  idCatastral?: number;
  nombreFinca?: number;
  ubicacionFinca?: string;
  direccionFinca?: string;
  hectareasFinca?: string;
  imagen?: FormData;
  observacionesFinca?: string;
  productor?: Productor;
}
