import { Router } from 'express';
import Config from '../config';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    msg: `GET a Productos. HOLA ${Config.NOMBRE}`,
  });
});

router.post('/', (req, res) => {
  res.json({
    msg: 'POST a Productos',
  });
});

router.put('/', (req, res) => {
  res.json({
    msg: 'PUT a Productos',
  });
});

router.delete('/', (req, res) => {
  res.json({
    msg: 'DELETE a Productos',
  });
});

export default router;
