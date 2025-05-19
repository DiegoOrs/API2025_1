import{Router} from 'express'
import { getClientes,getClientesxid,postClientes,putClientes,patchClientes,deleteClientes} from '../controladores/clientesCtrl.js';

const router=Router();

//armar las rutas "URl"

router.get('/clientes', getClientes);
router.get('/clientes/:id', getClientesxid);
router.post('/clientes', postClientes)
router.put('/clientes/:id', putClientes)
router.patch('/clientes/:id', patchClientes)

router.delete('/clientes/:id', deleteClientes)
export default router;