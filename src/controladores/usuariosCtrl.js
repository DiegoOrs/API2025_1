import { conmysql } from "../bd.js";

export const getUsuarios = async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM usuarios");
        res.json({ cant: result.length, data: result });
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener los usuarios" });
    }
}

export const getUsuariosxid = async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM usuarios WHERE usr_id = ?", [req.params.id]);
        if (result.length <= 0) {
            return res.status(404).json({
                usr_id: 0,
                message: "No se encontró el usuario",
            });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener el usuario" });
    }
}

export const postUsuarios = async (req, res) => {
    try {
        const { usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo } = req.body;
        const [result] = await conmysql.query(
            "INSERT INTO usuarios(usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo) VALUES(?,?,?,?,?,?)",
            [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo || 1]
        );
        res.json({
            id: result.insertId,
            usr_usuario,
            message: "Usuario creado correctamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear el usuario",
            error: error.message,
        });
    }
}

export const putUsuarios = async (req, res) => {
    try {
        const { id } = req.params;
        const { usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo } = req.body;

        const [result] = await conmysql.query(
            "UPDATE usuarios SET usr_usuario = ?, usr_clave = ?, usr_nombre = ?, usr_telefono = ?, usr_correo = ?, usr_activo = ? WHERE usr_id = ?",
            [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No se encontró el usuario",
            });
        }

        const [row] = await conmysql.query("SELECT * FROM usuarios WHERE usr_id = ?", [id]);
        res.json(row[0]);

    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar el usuario",
            error: error.message,
        });
    }
};

export const patchUsuarios = async (req, res) => {
    try {
        const { id } = req.params;
        const { usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo } = req.body;
        
        const [result] = await conmysql.query(
            "UPDATE usuarios SET usr_usuario = IFNULL(?, usr_usuario), usr_clave = IFNULL(?, usr_clave), usr_nombre = IFNULL(?, usr_nombre), usr_telefono = IFNULL(?, usr_telefono), usr_correo = IFNULL(?, usr_correo), usr_activo = IFNULL(?, usr_activo) WHERE usr_id = ?",
            [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No se encontró el usuario",
            });
        }

        const [row] = await conmysql.query("SELECT * FROM usuarios WHERE usr_id = ?", [id]);
        res.json(row[0]);

    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar el usuario",
            error: error.message,
        });
    }
};

export const deleteUsuarios = async (req, res) => {
    try {
        const [result] = await conmysql.query("DELETE FROM usuarios WHERE usr_id = ?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No se encontró el usuario",
            });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar el usuario",
            error: error.message
        });
    }
};