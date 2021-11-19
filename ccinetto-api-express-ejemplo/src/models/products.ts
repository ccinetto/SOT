import { Schema } from 'mongoose';

export interface ProductoI {
  title: string;
  price: number;
}

export const productoSchema = new Schema<ProductoI>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
});
