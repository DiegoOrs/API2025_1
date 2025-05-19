import { conmysql } from "../bd.js";

export const getPedidosDetalle = async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM pedidos_detalle");
        res.json({ cant: result.length, data: result });
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener los detalles de pedidos" });
    }
}

export const getPedidosDetallexid = async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM pedidos_detalle WHERE det_id = ?", [req.params.id]);
        if (result.length <= 0) {
            return res.status(404).json({
                det_id: 0,
                message: "No se encontró el detalle de pedido",
            });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener el detalle de pedido" });
    }
}

export const getDetallesPorPedido = async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM pedidos_detalle WHERE ped_id = ?", [req.params.ped_id]);
        res.json({ cant: result.length, data: result });
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener los detalles del pedido" });
    }
}

export const postPedidosDetalle = async (req, res) => {
    try {
        const { prod_id, ped_id, det_cantidad, det_precio } = req.body;
        const [result] = await conmysql.query(
            "INSERT INTO pedidos_detalle(prod_id, ped_id, det_cantidad, det_precio) VALUES(?,?,?,?)",
            [prod_id, ped_id, det_cantidad || 1, det_precio || 0]
        );
        res.json({
            id: result.insertId,
            ped_id,
            message: "Detalle de pedido creado correctamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear el detalle de pedido",
            error: error.message,
        });
    }
}

export const putPedidosDetalle = async (req, res) => {
    try {
        const { id } = req.params;
        const { prod_id, ped_id, det_cantidad, det_precio } = req.body;

        const [result] = await conmysql.query(
            "UPDATE pedidos_detalle SET prod_id = ?, ped_id = ?, det_cantidad = ?, det_precio = ? WHERE det_id = ?",
            [prod_id, ped_id, det_cantidad, det_precio, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No se encontró el detalle de pedido",
            });
        }

        const [row] = await conmysql.query("SELECT * FROM pedidos_detalle WHERE det_id = ?", [id]);
        res.json(row[0]);

    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar el detalle de pedido",
            error: error.message,
        });
    }
};

export const patchPedidosDetalle = async (req, res) => {
    try {
        const { id } = req.params;
        const { prod_id, ped_id, det_cantidad, det_precio } = req.body;
        
        const [result] = await conmysql.query(
            "UPDATE pedidos_detalle SET prod_id = IFNULL(?, prod_id), ped_id = IFNULL(?, ped_id), det_cantidad = IFNULL(?, det_cantidad), det_precio = IFNULL(?, det_precio) WHERE det_id = ?",
            [prod_id, ped_id, det_cantidad, det_precio, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No se encontró el detalle de pedido",
            });
        }

        const [row] = await conmysql.query("SELECT * FROM pedidos_detalle WHERE det_id = ?", [id]);
        res.json(row[0]);

    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar el detalle de pedido",
            error: error.message,
        });
    }
};

export const deletePedidosDetalle = async (req, res) => {
    try {
        const [result] = await conmysql.query("DELETE FROM pedidos_detalle WHERE det_id = ?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No se encontró el detalle de pedido",
            });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar el detalle de pedido",
            error: error.message
        });
    }
};