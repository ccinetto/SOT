import { Router, Request, Response, NextFunction } from 'express';
import LibrosRouter from './libros';
import LibreriasRouter from './librerias';

const mirouter = Router();

const middlewareLibros = (req: Request, res: Response, next: NextFunction) => {
  console.log('Se esta pidiendo un endpoint de libros');
  next();
};

const middlewareLibrerias = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Se esta pidiendo un endpoint de librerias');
  next();
};

mirouter.use('/libros', middlewareLibros, LibrosRouter);
mirouter.use('/librerias', middlewareLibrerias, LibreriasRouter);

export default mirouter;
