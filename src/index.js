import app from './app.js'
import { PORT } from './config.js'
app.listen(PORT);//3000
console.log("Servidor se esta ejecutando en el puerto", PORT)