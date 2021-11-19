import { MongoAtlas } from 'src/services/mongoDB';
import mongoose from 'mongoose';
import { ProductI } from '../models/products';
import { Request, Response } from 'express';

const getProducts = async (req: Request, res: Response) => {
  const products: mongoose.Model<ProductI> = MongoAtlas.getProductModel();

  const data = await products.find();

  res.json({
    data,
  });
};

export const productsController = {
  getProducts,
};
