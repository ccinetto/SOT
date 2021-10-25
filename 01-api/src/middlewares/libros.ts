import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import LibrosAPI from '../apis/libros';

const libroSchemaPost = Joi.object({
  nombre: Joi.string().alphanum().min(3).max(30).required(),
  precio: Joi.number().integer().min(0).required(),
});

const libroSchemaPatch = Joi.object({
  nombre: Joi.string().alphanum().min(3).max(30).optional(),
  precio: Joi.number().integer().min(0).optional(),
});

export const checkBodyLibro = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;

  try {
    if (req.method == 'POST') await libroSchemaPost.validateAsync(body);
    else await libroSchemaPatch.validateAsync(body);

    next();
  } catch (err) {
    if (err instanceof Error) next({ code: 400, message: err.message });
  }
};

export const findLibro = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (id) {
    const libros = await LibrosAPI.getLibros(id);

    if (!libros.length) next({ code: 404, message: 'Libro no encontrado' });
  }

  next();
};
