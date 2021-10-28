import { httpServer } from './services/server';

const puerto = 8081;

httpServer.listen(puerto, () => console.log('SERVER UP'));
