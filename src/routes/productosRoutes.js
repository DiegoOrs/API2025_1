import { Router } from 'express'
import { getProductos, getProductosxid, postProductos, putProductos, patchProductos, deleteProductos, upload } from '../controladores/productosCtrl.js';
import multer from 'multer'
const router = Router();
//configurar multer para almacenar las imagenes
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'uploads'); //carpeta donde se guardan las imagenes
        },
        filename:(req,file,cb)=>{
            cb(null,`${Date.now()}-${file.originalname}`);
        }
    });

    const uploads=multer({storage});
router.get('/productos', getProductos);
router.get('/productos/:id', getProductosxid);
router.post('/productos', upload.single('prod_imagen'), postProductos);
router.put('/productos/:id', putProductos);
router.patch('/productos/:id', patchProductos);
router.delete('/productos/:id', deleteProductos);

export default router;