import { Router } from 'express'
import { getProductos, getProductosxid, postProductos, putProductos, patchProductos, deleteProductos, upload } from '../controladores/productosCtrl.js';

const router = Router();

router.get('/productos', getProductos);
router.get('/productos/:id', getProductosxid);
router.post('/productos', upload.single('imagen_principal'), postProductos);
router.put('/productos/:id', putProductos);
router.patch('/productos/:id', patchProductos);
router.delete('/productos/:id', deleteProductos);

export default router;