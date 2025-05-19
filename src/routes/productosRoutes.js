import { Router } from 'express'
import { getProductos, getProductosxid, postProductos, putProductos, patchProductos, deleteProductos } from '../controladores/productosCtrl.js';

const router = Router();

router.get('/productos', getProductos);
router.get('/productos/:id', getProductosxid);
router.post('/productos', postProductos);
router.put('/productos/:id', putProductos);
router.patch('/productos/:id', patchProductos);
router.delete('/productos/:id', deleteProductos);

export default router;