import { conmysql } from "../bd.js";
import multer from 'multer';
import path from 'path';

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
export const upload = multer({ storage });

// GET: Todos los productos
export const getProductos = async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM productos");
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al consultar productos" });
  }
};

// GET: Producto por ID
export const getProductosxid = async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM productos WHERE prod_id = ?", [req.params.id]);
    if (result.length === 0) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

// POST: Crear nuevo producto con imagen
export const postProductos = async (req, res) => {
  try {
    const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo = 1 } = req.body;
    const imagen = req.file ? `/uploads/${req.file.filename}` : null;

    const [existeCodigo] = await conmysql.query("SELECT prod_id FROM productos WHERE prod_codigo = ?", [prod_codigo]);
    if (existeCodigo.length > 0) return res.status(400).json({ message: "El código ya existe" });

    const [result] = await conmysql.query(
      "INSERT INTO productos (prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen) VALUES (?, ?, ?, ?, ?, ?)",
      [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, imagen]
    );

    res.status(201).json({ id: result.insertId, message: "Producto creado" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto" });
  }
};

// PUT: Actualización completa
export const putProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo } = req.body;

    const [codigoUsado] = await conmysql.query("SELECT prod_id FROM productos WHERE prod_codigo = ? AND prod_id != ?", [prod_codigo, id]);
    if (codigoUsado.length > 0) return res.status(400).json({ message: "El código ya está en uso" });

    const [result] = await conmysql.query(
      "UPDATE productos SET prod_codigo = ?, prod_nombre = ?, prod_stock = ?, prod_precio = ?, prod_activo = ? WHERE prod_id = ?",
      [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto actualizado" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};

// PATCH: Actualización parcial
export const patchProductos = async (req, res) => {
  try {
    const { id } = req.params;

    const [producto] = await conmysql.query("SELECT * FROM productos WHERE prod_id = ?", [id]);
    if (producto.length === 0) return res.status(404).json({ message: "Producto no encontrado" });

    const campos = ['prod_codigo', 'prod_nombre', 'prod_stock', 'prod_precio', 'prod_activo'];
    const valores = [];
    const setSQL = campos.reduce((sql, campo) => {
      if (req.body[campo] !== undefined) {
        valores.push(req.body[campo]);
        return sql ? `${sql}, ${campo} = ?` : `${campo} = ?`;
      }
      return sql;
    }, '');

    if (!setSQL) return res.status(400).json({ message: "No se enviaron campos válidos" });

    valores.push(id);

    await conmysql.query(`UPDATE productos SET ${setSQL} WHERE prod_id = ?`, valores);

    res.json({ message: "Producto actualizado parcialmente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};

// DELETE: Eliminar producto
export const deleteProductos = async (req, res) => {
  try {
    const [result] = await conmysql.query("DELETE FROM productos WHERE prod_id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};
