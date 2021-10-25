import { Router } from 'express';
import { LibroController } from '../controllers/libros';
import asyncHandler from 'express-async-handler';
import { checkBodyLibro, findLibro } from '../middlewares/libros';

const mirouter = Router();

mirouter.get('/:id?', findLibro, asyncHandler(LibroController.getLibros));
mirouter.post('/', checkBodyLibro, asyncHandler(LibroController.crearLibro));
mirouter.patch(
  '/:id',
  findLibro,
  checkBodyLibro,
  asyncHandler(LibroController.actualizarLibro)
);
mirouter.delete('/:id', findLibro, asyncHandler(LibroController.borrarLibro));

export default mirouter;
