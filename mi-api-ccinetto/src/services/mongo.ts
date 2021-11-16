import Config from '../common/config';
import * as mongoose from 'mongoose';

class MongoDB {
  private uri: string;
  private connection?: mongoose.Mongoose;

  constructor() {
    this.uri = Config.MONGO_SRV;
  }

  async connect() {
    if (!this.connection) {
      console.log('LLAMANDO A CONECTAR POR PRIMERA VEZ');
      this.connection = await mongoose.connect(this.uri);
    } else console.log('YA SE LLAMO');

    return this.connection;
  }
}

export const MongoAtlas = new MongoDB();
