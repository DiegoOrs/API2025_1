import { Router } from 'express'
import { getUsuarios, getUsuariosxid, postUsuarios, putUsuarios, patchUsuarios, deleteUsuarios } from '../controladores/usuariosCtrl.js';

const router = Router();

router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuariosxid);
router.post('/usuarios', postUsuarios);
router.put('/usuarios/:id', putUsuarios);
router.patch('/usuarios/:id', patchUsuarios);
router.delete('/usuarios/:id', deleteUsuarios);

export default router;