import config from 'src/config';
import mongoose from 'mongoose';
import { ProductI, productsSchema } from 'src/models/products';

class MongoDB {
  private uri: string;
  private connection: mongoose.Mongoose;
  private productModel: mongoose.Model<ProductI>;

  constructor() {
    this.uri = config.MONGO_SRV;
  }

  async init() {
    if (!this.connection) {
      console.log('Connection es nulo. Lo inicializamos');
      this.connection = await mongoose.connect(this.uri);
    } else console.log('Connection ya esta inicializado');

    this.productModel = this.connection.model<ProductI>(
      'product',
      productsSchema
    );
    return this.connection;
  }

  getProductModel() {
    return this.productModel;
  }
}

export const MongoAtlas = new MongoDB();
