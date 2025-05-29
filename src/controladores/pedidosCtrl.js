import { conmysql } from "../bd.js";

// Obtener todos los pedidos
export const getPedidos = async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM pedidos");
    res.json({ cant: result.length, data: result });
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los pedidos" });
  }
};

// Obtener pedido por ID
export const getPedidosxid = async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM pedidos WHERE ped_id = ?", [req.params.id]);
    if (result.length <= 0) {
      return res.status(404).json({ ped_id: 0, message: "No se encontró el pedido" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el pedido" });
  }
};

// Crear pedido simple (puedes mantenerlo si deseas)
export const postPedidos = async (req, res) => {
  const { cli_id, usr_id, productos } = req.body; // productos: [{ prod_id, cantidad, precio }]
  const connection = await conmysql.getConnection();

  try {
    await connection.beginTransaction();

    const [pedido] = await connection.query(
      "INSERT INTO pedidos (cli_id, usr_id, ped_fecha, ped_estado) VALUES (?, ?, NOW(), 1)",
      [cli_id, usr_id]
    );

    const ped_id = pedido.insertId;

    for (const item of productos) {
      await connection.query(
        "INSERT INTO pedidos_detalle (prod_id, ped_id, det_cantidad, det_precio) VALUES (?, ?, ?, ?)",
        [item.prod_id, ped_id, item.cantidad, item.precio]
      );
    }

    await connection.commit();
    res.status(200).json({ message: "Pedido registrado correctamente", ped_id });
  } catch (error) {
    await connection.rollback();
    console.error("Error al registrar el pedido:", error);
    res.status(500).json({ error: "Error al registrar el pedido" });
  } finally {
    connection.release();
  }
};

// Crear pedido con detalles (pedido + productos)
/*export const crearPedidoConDetalles = async (req, res) => {
  const { cli_id, usr_id, productos } = req.body; // productos: [{ prod_id, cantidad, precio }]
  const connection = await conmysql.getConnection();

  try {
    await connection.beginTransaction();

    const [pedido] = await connection.query(
      "INSERT INTO pedidos (cli_id, usr_id, ped_fecha, ped_estado) VALUES (?, ?, NOW(), 1)",
      [cli_id, usr_id]
    );

    const ped_id = pedido.insertId;

    for (const item of productos) {
      await connection.query(
        "INSERT INTO pedidos_detalle (prod_id, ped_id, det_cantidad, det_precio) VALUES (?, ?, ?, ?)",
        [item.prod_id, ped_id, item.cantidad, item.precio]
      );
    }

    await connection.commit();
    res.status(200).json({ message: "Pedido registrado correctamente", ped_id });
  } catch (error) {
    await connection.rollback();
    console.error("Error al registrar el pedido:", error);
    res.status(500).json({ error: "Error al registrar el pedido" });
  } finally {
    connection.release();
  }
};*/

// Actualizar pedido completo
export const putPedidos = async (req, res) => {
  try {
    const { id } = req.params;
    const { cli_id, ped_fecha, usr_id, ped_estado } = req.body;

    const [result] = await conmysql.query(
      "UPDATE pedidos SET cli_id = ?, ped_fecha = ?, usr_id = ?, ped_estado = ? WHERE ped_id = ?",
      [cli_id, ped_fecha, usr_id, ped_estado, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No se encontró el pedido" });
    }

    const [row] = await conmysql.query("SELECT * FROM pedidos WHERE ped_id = ?", [id]);
    res.json(row[0]);

  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el pedido", error: error.message });
  }
};

// Actualización parcial
export const patchPedidos = async (req, res) => {
  try {
    const { id } = req.params;
    const { cli_id, ped_fecha, usr_id, ped_estado } = req.body;

    const [result] = await conmysql.query(
      "UPDATE pedidos SET cli_id = IFNULL(?, cli_id), ped_fecha = IFNULL(?, ped_fecha), usr_id = IFNULL(?, usr_id), ped_estado = IFNULL(?, ped_estado) WHERE ped_id = ?",
      [cli_id, ped_fecha, usr_id, ped_estado, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No se encontró el pedido" });
    }

    const [row] = await conmysql.query("SELECT * FROM pedidos WHERE ped_id = ?", [id]);
    res.json(row[0]);

  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el pedido", error: error.message });
  }
};

// Eliminar pedido
export const deletePedidos = async (req, res) => {
  try {
    const [result] = await conmysql.query("DELETE FROM pedidos WHERE ped_id = ?", [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No se encontró el pedido" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el pedido", error: error.message });
  }
};
