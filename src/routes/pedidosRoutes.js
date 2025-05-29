import { Router } from 'express'
import { crearPedidoConDetalles, getPedidos, getPedidosxid, postPedidos, putPedidos, patchPedidos, deletePedidos } from '../controladores/pedidosCtrl.js';

const router = Router();

router.get('/pedidos', getPedidos);
router.get('/pedidos/:id', getPedidosxid);
router.post('/pedidos',postPedidos);
router.put('/pedidos/:id', putPedidos);
router.patch('/pedidos/:id', patchPedidos);
router.delete('/pedidos/:id', deletePedidos);
router.post('/crear', crearPedidoConDetalles);

export default router;