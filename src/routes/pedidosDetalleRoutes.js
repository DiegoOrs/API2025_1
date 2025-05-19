import { Router } from 'express'
import { getPedidosDetalle, getPedidosDetallexid, getDetallesPorPedido, postPedidosDetalle, putPedidosDetalle, patchPedidosDetalle, deletePedidosDetalle } from '../controladores/pedidosDetalleCtrl.js';

const router = Router();

router.get('/pedidos_detalle', getPedidosDetalle);
router.get('/pedidos_detalle/:id', getPedidosDetallexid);
router.get('/pedidos/:ped_id/detalles', getDetallesPorPedido);
router.post('/pedidos_detalle', postPedidosDetalle);
router.put('/pedidos_detalle/:id', putPedidosDetalle);
router.patch('/pedidos_detalle/:id', patchPedidosDetalle);
router.delete('/pedidos_detalle/:id', deletePedidosDetalle);

export default router;