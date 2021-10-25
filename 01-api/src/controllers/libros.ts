import { Request, Response, NextFunction } from 'express';
import LibrosAPI from '../apis/libros';

class Libro {
  async getLibros(req: Request, res: Response, next: NextFunction) {
    const libros = await LibrosAPI.getLibros(req.params.id);
    res.json({ msg: 'Retornando libros', libros });
  }

  async crearLibro(req: Request, res: Response) {
    const { body } = req;

    const response = await LibrosAPI.crearLibro(body);

    res.json({ msg: 'Creando libro', response });
  }

  async actualizarLibro(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    const response = await LibrosAPI.actualizarLibro(id, body);

    res.json({ msg: 'Actualizando libro', response });
  }

  async borrarLibro(req: Request, res: Response) {
    const { id } = req.params;

    await LibrosAPI.borrarLibro(id);
    res.json({ msg: 'Libro Borrado' });
  }
}

export const LibroController = new Libro();
