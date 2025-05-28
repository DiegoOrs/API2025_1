import { Router } from 'express';
import { login } from '../controladores/authController.js';

const router = Router();
router.post('/login', login); // Ruta pública para generar token
export default router;