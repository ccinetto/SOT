import ApiLibroMem from './DAO/memory';
import ApiLibroMySQL from './DAO/mysql';

export enum TipoPersitencia {
  Memoria = 'MEM',
  MYSQL = 'MYSQL',
}

export class LibrosFactory {
  static get(tipo: TipoPersitencia) {
    switch (tipo) {
      case TipoPersitencia.Memoria:
        console.log('Retornando Instancia Clase Mem');
        return new ApiLibroMem();

      case TipoPersitencia.MYSQL:
        console.log('Retornando Instancia Clase Mem');
        return new ApiLibroMySQL();

      default:
        return new ApiLibroMem();
    }
  }
}
