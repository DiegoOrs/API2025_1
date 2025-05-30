import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
//importar las rutas
import clientesRoutes from './routes/clientesRoutes.js'
import pedidosRoutes from './routes/pedidosRoutes.js'
import pedidosDetalleRoutes from './routes/pedidosDetalleRoutes.js'
import productosRoutes from './routes/productosRoutes.js'
import usuariosRoutes from './routes/usuariosRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { authenticateToken } from './middlewares/auth.js'

//definir los modulos de entrada
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

//definir los permisos
const corsOptions={
    origin:'*', //la direccion del dominio del servidor
    methods:['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials:true
}


const app=express();
app.use(cors(corsOptions));
app.use(express.json()) //interpretar objetos json
app.use(express.urlencoded({extended:true})) //se añade para poder receptar por unidad
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));



app.use('/api/auth',authRoutes)
//Nuestras rutas protegidas
app.use('/api/', /*authenticateToken,*/ clientesRoutes)
app.use('/api', /*authenticateToken,*/ usuariosRoutes)
app.use('/api',/*authenticateToken,*/ productosRoutes)
app.use('/api', /*authenticateToken,*/ pedidosDetalleRoutes)
app.use('/api', /*authenticateToken,*/ pedidosRoutes)


app.use((req,resp,next)=>{
    resp.status(404).json({
        message:' Endponit not fount'
    })
})

export default app;