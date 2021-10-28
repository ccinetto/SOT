import { uuid } from 'uuidv4';
import { LibroI, newLibroI } from '../libros.interfaces';

class Libro {
  private libros: LibroI[] = [
    {
      _id: '1234',
      nombre: 'game of thrones',
      precio: 2000,
    },
    {
      _id: '12',
      nombre: 'el señor de los anillos',
      precio: 20,
    },
    {
      _id: '123',
      nombre: 'harry poter',
      precio: 2000,
    },
  ];

  async getLibros(id: string | undefined = undefined): Promise<LibroI[]> {
    if (id) return this.libros.filter((unLibro) => unLibro._id === id);

    return this.libros;
  }

  async crearLibro(data: newLibroI): Promise<LibroI> {
    const newLibro = {
      _id: uuid(),
      ...data,
    };

    this.libros.push(newLibro);

    return newLibro;
  }

  async actualizarLibro(id: string, data: newLibroI): Promise<LibroI> {
    const indice = this.libros.findIndex((unLibro) => unLibro._id === id);
    console.log(`Indice ==> ${indice}`);

    const oldLibro = this.libros[indice];

    const newLibro = Object.assign(oldLibro, data);

    this.libros.splice(indice, 1, newLibro);

    return oldLibro;
  }

  async borrarLibro(id: string): Promise<void> {
    const indice = this.libros.findIndex((unLibro) => unLibro._id === id);
    this.libros.splice(indice, 1);
  }
}

export default Libro;
