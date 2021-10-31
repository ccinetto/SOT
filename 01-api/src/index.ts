import Config from './config';
import myFancyWebServer from './services/server';
import { DbService } from './services/db';

const inicializar = async () => {
  await DbService.initDb();
  myFancyWebServer.listen(Config.PORT, () => {
    console.log('SERVER UP');
  });
};

inicializar();
