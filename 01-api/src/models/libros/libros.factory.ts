import ApiLibroMem from './DAO/memory';
import ApiLibroSQL from './DAO/mysql';
import ApiLibrosMongo from './DAO/mongo';

export enum TipoPersitencia {
  Memoria = 'MEM',
  MYSQL = 'MYSQL',
  MONGO = 'MONGO',
}

export class LibrosFactory {
  static get(tipo: TipoPersitencia) {
    switch (tipo) {
      case TipoPersitencia.Memoria:
        console.log('Retornando Instancia Clase Mem');
        return new ApiLibroMem();

      case TipoPersitencia.MYSQL:
        console.log('Retornando Instancia Clase SQL');
        return new ApiLibroSQL();

      case TipoPersitencia.MONGO:
        console.log('Retornando Instancia Clase SQL');
        return new ApiLibrosMongo();

      default:
        return new ApiLibroMem();
    }
  }
}
