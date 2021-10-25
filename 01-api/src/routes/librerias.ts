import { Router } from 'express';

const mirouter = Router();

mirouter.get('/', (req, res) => {
  res.json({ mgs: 'HOLA ROUTER LIBRERIA' });
});

export default mirouter;
