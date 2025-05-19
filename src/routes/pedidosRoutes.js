import { Router } from 'express'
import { getPedidos, getPedidosxid, postPedidos, putPedidos, patchPedidos, deletePedidos } from '../controladores/pedidosCtrl.js';

const router = Router();

router.get('/pedidos', getPedidos);
router.get('/pedidos/:id', getPedidosxid);
router.post('/pedidos',postPedidos);
router.put('/pedidos/:id', putPedidos);
router.patch('/pedidos/:id', patchPedidos);
router.delete('/pedidos/:id', deletePedidos);

export default router;