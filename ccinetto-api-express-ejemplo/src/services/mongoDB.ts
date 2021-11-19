import Config from '../config';
import * as mongoose from 'mongoose';
import { ProductoI, productoSchema } from 'src/models/products';

let connection: mongoose.Connection = null;

class MongoDB {
  private uri: string;
  private productModel: mongoose.Model<ProductoI>;

  constructor() {
    this.uri = Config.MONGO_SRV;
  }

  async connect(): Promise<mongoose.Connection> {
    console.log(connection);
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
    this.productModel = connection.model<ProductoI>('books', productoSchema);

    return {
      Product: this.productModel,
    };
  }

  isValidId(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id);
  }
}

export const MongoAtlas = new MongoDB();
