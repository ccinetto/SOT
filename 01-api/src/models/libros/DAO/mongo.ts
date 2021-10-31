import Config from '../../../config';
import mongoose, { Schema } from 'mongoose';
import { uuid } from 'uuidv4';
import { LibroI, newLibroI } from '../libros.interfaces';

class Libro {
  private libro;
  private libroSchema;
  private connect: boolean;

  constructor() {
    this.connect = false;
    this.libroSchema = new Schema<LibroI>({
      nombre: String,
      precio: Number,
    });
    this.libro = mongoose.model<LibroI>('libro', this.libroSchema);
  }

  async init() {
    await mongoose.connect(Config.MONGO_SRV);
    console.log('DB READY');
  }

  async getLibros(id?: string): Promise<LibroI[]> {
    if (!this.connect) {
      await this.init();
      this.connect = true;
    }
    let output: LibroI[] = [];

    if (id) {
      const document = await this.libro.findById(id);
      if (document) output.push(document);
    } else output = await this.libro.find();

    return output;
  }

  async crearLibro(data: newLibroI): Promise<LibroI> {
    const newLibro = new this.libro(data);
    await newLibro.save();

    return newLibro;
  }

  async actualizarLibro(id: string, data: newLibroI): Promise<LibroI> {
    await this.libro.findByIdAndUpdate(id, data);

    const newLibro = await this.getLibros(id);
    return newLibro[0];
  }

  async borrarLibro(id: string): Promise<void> {
    await this.libro.findByIdAndDelete(id);
  }
}

export default Libro;
