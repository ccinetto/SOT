import myFancyWebServer from './services/server';
import { DbService } from './services/db';

const inicializar = async () => {
  await DbService.initDb();
  myFancyWebServer.listen(8080, () => {
    console.log('SERVER UP');
  });
};

inicializar();
