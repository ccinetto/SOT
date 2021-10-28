import { Router } from 'express';
import { wsServer } from '../services/server';

const router = Router();

router.use('/suma', (req, res) => {
  res.json({ msg: 'done' });
  //enviar a todos los clientes via WS que termine

  const data = {
    msg: 'Termine la operacion suma',
    date: new Date(),
  };

  wsServer.emit('all', data);
});

export default router;
