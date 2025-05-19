import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import clientesRoutes from './routes/clientesRoutes.js';
import productosRoutes from './routes/productosRoutes.js';
import pedidosRoutes from './routes/pedidosRoutes.js';
import pedidosDetalleRoutes from './routes/pedidosDetalleRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';

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

// Rutas
app.use('/api', clientesRoutes);
app.use('/api', productosRoutes);
app.use('/api', pedidosRoutes);
app.use('/api', pedidosDetalleRoutes);
app.use('/api', usuariosRoutes);

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint not found'
  });
});

export default app;