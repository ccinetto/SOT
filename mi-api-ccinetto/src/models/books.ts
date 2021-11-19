import { Schema } from 'mongoose';

export interface LibroI {
  title: string;
  price: number;
}

export const libroSchema = new Schema<LibroI>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
});
