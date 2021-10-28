import express from 'express';
import path from 'path';
import http from 'http';
import mainRouter from '../routes';
import { initWSServer } from './socket';

const app = express();

const publicPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicPath));

app.get('/hola', (req, res) => {
  res.json({ msg: 'HOLAAA' });
});

app.use('/api', mainRouter);

export const httpServer = http.createServer(app);

export const wsServer = initWSServer(httpServer);
