import { conmysql } from "../bd.js";

export const getPedidos = async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM pedidos");
        res.json({ cant: result.length, data: result });
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener los pedidos" });
    }
}

export const getPedidosxid = async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM pedidos WHERE ped_id = ?", [req.params.id]);
        if (result.length <= 0) {
            return res.status(404).json({
                ped_id: 0,
                message: "No se encontró el pedido",
            });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener el pedido" });
    }
}

export const postPedidos = async (req, res) => {
    try {
        const { cli_id, ped_fecha, usr_id, ped_estado } = req.body;
        const [result] = await conmysql.query(
            "INSERT INTO pedidos(cli_id, ped_fecha, usr_id, ped_estado) VALUES(?,?,?,?)",
            [cli_id, ped_fecha || new Date(), usr_id, ped_estado || 0]
        );
        res.json({
            id: result.insertId,
            cli_id,
            message: "Pedido creado correctamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear el pedido",
            error: error.message,
        });
    }
}

export const putPedidos = async (req, res) => {
    try {
        const { id } = req.params;
        const { cli_id, ped_fecha, usr_id, ped_estado } = req.body;

        const [result] = await conmysql.query(
            "UPDATE pedidos SET cli_id = ?, ped_fecha = ?, usr_id = ?, ped_estado = ? WHERE ped_id = ?",
            [cli_id, ped_fecha, usr_id, ped_estado, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No se encontró el pedido",
            });
        }

        const [row] = await conmysql.query("SELECT * FROM pedidos WHERE ped_id = ?", [id]);
        res.json(row[0]);

    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar el pedido",
            error: error.message,
        });
    }
};

export const patchPedidos = async (req, res) => {
    try {
        const { id } = req.params;
        const { cli_id, ped_fecha, usr_id, ped_estado } = req.body;
        
        const [result] = await conmysql.query(
            "UPDATE pedidos SET cli_id = IFNULL(?, cli_id), ped_fecha = IFNULL(?, ped_fecha), usr_id = IFNULL(?, usr_id), ped_estado = IFNULL(?, ped_estado) WHERE ped_id = ?",
            [cli_id, ped_fecha, usr_id, ped_estado, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No se encontró el pedido",
            });
        }

        const [row] = await conmysql.query("SELECT * FROM pedidos WHERE ped_id = ?", [id]);
        res.json(row[0]);

    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar el pedido",
            error: error.message,
        });
    }
};

export const deletePedidos = async (req, res) => {
    try {
        const [result] = await conmysql.query("DELETE FROM pedidos WHERE ped_id = ?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No se encontró el pedido",
            });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar el pedido",
            error: error.message
        });
    }
};