import { uuid } from 'uuidv4';
import { LibroI, newLibroI } from '../libros.interfaces';
import { DbService } from '../../../services/db';

class Libro {
  private librosTable = 'libros';

  async getLibros(id: string | undefined = undefined): Promise<LibroI[]> {
    return DbService.get(this.librosTable, id);
  }

  async crearLibro(data: newLibroI): Promise<LibroI> {
    const newLibro = {
      _id: uuid(),
      ...data,
    };

    await DbService.create(this.librosTable, newLibro);

    return newLibro;
  }

  async actualizarLibro(id: string, data: newLibroI): Promise<LibroI> {
    const result = await DbService.update(this.librosTable, id, data);
    return result;
  }

  async borrarLibro(id: string): Promise<void> {
    await DbService.delete(this.librosTable, id);
  }
}

export default Libro;
