import { Server } from 'socket.io';
import http from 'http';

export const initWSServer = (app: http.Server) => {
  const myWsServer = new Server(app);

  myWsServer.on('connection', (socket) => {
    console.log(`El cliente se ha conectado`);
    console.log(socket.id);

    socket.on('sot-dev-backend', (data) => {
      console.log(`Recibi un dato de mi cliente`);
      console.log(data);

      socket.broadcast.emit('direct-response', { ...data, fromServer: true });
    });
  });

  return myWsServer;
};
