import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


import clientesRoutes from './routes/clientesRoutes.js';
import productosRoutes from './routes/productosRoutes.js';
import pedidosRoutes from './routes/pedidosRoutes.js';
import pedidosDetalleRoutes from './routes/pedidosDetalleRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';

import authRoutes from './routes/authRoutes.js';
import { authRequired } from './middlewares/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
};

const app = express();

// Middlewares en orden correcto
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
// Rutas
app.use('/api', /*authRequired*/ clientesRoutes);
app.use('/api', /*authRequired*/ productosRoutes);
app.use('/api', /*authRequired*/ pedidosRoutes);
app.use('/api', /*authRequired*/ pedidosDetalleRoutes);
app.use('/api', /*authRequired*/ usuariosRoutes);



// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint not found'
  });
});

export default app;