import Config from '../config';
import * as mongoose from 'mongoose';
import { LibroI, libroSchema } from 'src/models/books';

let connection: mongoose.Connection = null;
class MongoDB {
  private uri: string;
  private libroModel: mongoose.Model<LibroI>;

  constructor() {
    this.uri = Config.MONGO_SRV;
    this.libroModel;
  }

  async connect(): Promise<mongoose.Connection> {
    if (connection == null) {
      console.log('LLAMANDO A CONECTAR POR PRIMERA VEZ');
      connection = mongoose.createConnection(this.uri, {
        // and tell the MongoDB driver to not wait more than 5 seconds
        // before erroring out if it isn't connected
        serverSelectionTimeoutMS: 5000,
      });
      await connection;
    } else console.log('YA SE LLAMO');

    return connection;
  }

  async getModels() {
    this.libroModel = connection.model<LibroI>('books', libroSchema);

    return {
      LibroModel: this.libroModel,
    };
  }

  isValidId(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id);
  }
}

export const MongoAtlas = new MongoDB();
