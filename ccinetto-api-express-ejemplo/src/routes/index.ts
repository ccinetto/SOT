import { Router } from 'express';
import ProductsRouter from './products';

const router = Router();

router.use('/products', ProductsRouter);

export default router;
