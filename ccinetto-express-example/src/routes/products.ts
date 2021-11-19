import { Router } from 'express';
import { productsController } from 'src/controllers/products';

const router = Router();

router.get('/', productsController.getProducts);

router.post('/', (req, res) => {
  res.json({
    msg: 'POST de productos',
  });
});

router.put('/', (req, res) => {
  res.json({
    msg: 'PUT de productos',
  });
});

router.delete('/', (req, res) => {
  res.json({
    msg: 'DELETE de productos',
  });
});

export default router;
