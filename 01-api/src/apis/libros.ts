import { LibroI, newLibroI } from '../models/libros/libros.interfaces';
import {
  LibrosFactory,
  TipoPersitencia,
} from '../models/libros/libros.factory';
class Libro {
  private libros;
  private tipo;

  constructor() {
    this.tipo = TipoPersitencia.MONGO;
    this.libros = LibrosFactory.get(this.tipo);
  }

  async getLibros(id: string | undefined = undefined): Promise<LibroI[]> {
    if (id) return this.libros.getLibros(id);

    return this.libros.getLibros();
  }

  async crearLibro(data: newLibroI): Promise<LibroI> {
    const newLibro = await this.libros.crearLibro(data);

    return newLibro;
  }

  async actualizarLibro(id: string, data: newLibroI): Promise<LibroI> {
    const newLibro = await this.libros.actualizarLibro(id, data);

    return newLibro;
  }

  async borrarLibro(id: string): Promise<void> {
    await this.libros.borrarLibro(id);
  }
}

const LibrosAPI = new Libro();

export default LibrosAPI;
