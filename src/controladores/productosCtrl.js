import { conmysql } from "../bd.js";
import multer from 'multer';
import path from 'path';

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Controlador para obtener todos los productos
export const getProductos = async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM productos");
    res.json({ 
      success: true,
      count: result.length, 
      data: result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Error al obtener los productos",
      error: error.message 
    });
  }
}

// Controlador para obtener un producto por ID
export const getProductosxid = async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM productos WHERE prod_id = ?", [req.params.id]);
    
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado"
      });
    }
    
    res.json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el producto",
      error: error.message
    });
  }
}

// Controlador para crear nuevo producto
export const postProductos = async (req, res) => {
  // Primero maneja la subida de la imagen
  upload.single('prod_imagen')(req, res, async (err) => {
    try {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error al subir la imagen",
          error: err.message
        });
      }

      // Verificar si hay body
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          success: false,
          message: "El cuerpo de la solicitud está vacío"
        });
      }

      // Extraer datos del body (ahora deberían estar disponibles)
      const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo } = req.body;

      // Validar campos obligatorios
      if (!prod_codigo || !prod_nombre || prod_stock === undefined || prod_precio === undefined) {
        return res.status(400).json({
          success: false,
          message: "Faltan campos requeridos",
          required: ["prod_codigo", "prod_nombre", "prod_stock", "prod_precio"],
          received: req.body
        });
      }

      // Verificar si el código ya existe
      const [existing] = await conmysql.query(
        "SELECT prod_id FROM productos WHERE prod_codigo = ?", 
        [prod_codigo]
      );

      if (existing.length > 0) {
        return res.status(400).json({
          success: false,
          message: "El código de producto ya existe",
          existingProduct: existing[0]
        });
      }

      // Procesar la imagen si se subió
      let imagenPath = null;
      if (req.file) {
        imagenPath = '/uploads/' + req.file.filename;
      }

      // Insertar en la base de datos
      const [result] = await conmysql.query(
        "INSERT INTO productos (prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen) VALUES (?, ?, ?, ?, ?, ?)",
        [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo || 1, imagenPath]
      );

      res.status(201).json({
        success: true,
        message: "Producto creado exitosamente",
        productId: result.insertId,
        data: {
          prod_codigo,
          prod_nombre,
          prod_stock,
          prod_precio,
          prod_activo: prod_activo || 1,
          prod_imagen: imagenPath
        }
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al crear el producto",
        error: error.message
      });
    }
  });
}

// Controlador para actualización completa (PUT)
export const putProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo } = req.body;

    // Validar campos obligatorios
    if (!prod_codigo || !prod_nombre || prod_stock === undefined || prod_precio === undefined) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son requeridos para actualización completa"
      });
    }

    // Verificar si el código ya existe en otro producto
    const [codeExists] = await conmysql.query(
      "SELECT prod_id FROM productos WHERE prod_codigo = ? AND prod_id != ?",
      [prod_codigo, id]
    );

    if (codeExists.length > 0) {
      return res.status(400).json({
        success: false,
        message: "El código de producto ya está en uso por otro producto"
      });
    }

    // Actualizar el producto
    const [result] = await conmysql.query(
      "UPDATE productos SET prod_codigo = ?, prod_nombre = ?, prod_stock = ?, prod_precio = ?, prod_activo = ? WHERE prod_id = ?",
      [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado"
      });
    }

    // Obtener y devolver el producto actualizado
    const [updated] = await conmysql.query(
      "SELECT * FROM productos WHERE prod_id = ?",
      [id]
    );

    res.json({
      success: true,
      message: "Producto actualizado exitosamente",
      data: updated[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al actualizar el producto",
      error: error.message
    });
  }
}

// Controlador para actualización parcial (PATCH)
export const patchProductos = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el producto existe
    const [existing] = await conmysql.query(
      "SELECT * FROM productos WHERE prod_id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado"
      });
    }

    // Verificar si se está actualizando el código
    if (req.body.prod_codigo && req.body.prod_codigo !== existing[0].prod_codigo) {
      const [codeExists] = await conmysql.query(
        "SELECT prod_id FROM productos WHERE prod_codigo = ? AND prod_id != ?",
        [req.body.prod_codigo, id]
      );

      if (codeExists.length > 0) {
        return res.status(400).json({
          success: false,
          message: "El nuevo código de producto ya está en uso"
        });
      }
    }

    // Construir la consulta dinámica
    const fieldsToUpdate = {};
    const validFields = ['prod_codigo', 'prod_nombre', 'prod_stock', 'prod_precio', 'prod_activo'];

    validFields.forEach(field => {
      if (req.body[field] !== undefined) {
        fieldsToUpdate[field] = req.body[field];
      }
    });

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No se proporcionaron campos válidos para actualizar"
      });
    }

    // Generar la consulta SQL dinámica
    const setClause = Object.keys(fieldsToUpdate)
      .map(field => `${field} = ?`)
      .join(', ');

    const values = [...Object.values(fieldsToUpdate), id];

    const [result] = await conmysql.query(
      `UPDATE productos SET ${setClause} WHERE prod_id = ?`,
      values
    );

    // Obtener y devolver el producto actualizado
    const [updated] = await conmysql.query(
      "SELECT * FROM productos WHERE prod_id = ?",
      [id]
    );

    res.json({
      success: true,
      message: "Producto actualizado parcialmente",
      data: updated[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al actualizar el producto",
      error: error.message
    });
  }
}

// Controlador para eliminar producto
export const deleteProductos = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "DELETE FROM productos WHERE prod_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado"
      });
    }

    res.status(204).end();

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar el producto",
      error: error.message
    });
  }
}