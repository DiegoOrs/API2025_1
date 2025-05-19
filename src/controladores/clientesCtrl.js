import { conmysql } from "../bd.js";

export const obetenerClientes = async (req, res) => {
    res.send("Clientes obtenidos correctamente");
}
export const getClientes = async (req, res) => {
    try{
        const [result]=await conmysql.query("select * from clientes");
        res.json(({cant:result.length, data:result}));
    }catch (error) {
        return res.status(500).json({message: "Error al obtener los clientes",});
    }

}

//retorna cliente x id
export const getClientesxid = async (req, res) => {
    try{
        //const miID = [req.params.id];
        const [result]=await conmysql.query("select * from clientes where cli_id = ?", [req.params.id]);
        //res.json(({cant:result.length, data:result}));
        if(result.length <= 0){
            return res.status(404).json({
                cli_id:0,
                message: "No se encontró el cliente",
            });
        }
        res.json(result[0]);

    }catch (error) {
        return res.status(500).json({message: "Error al obtener los clientes",});
    }
}

//insertar cliente

export const postClientes=async(req, res)=>{
    try{
        const {cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad}=req.body
        console.log(req.body);
        const [result]=await conmysql.query("insert into clientes(cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad) values(?,?,?,?,?,?,?)",
        [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad]);
        req.send({
            id:result.insertId,
        })
        
    }catch(error){
        return res.status(500).json({
            message: "Error al obtener los clientes",
            error: error.message,});
    }
}


//funcion que permite modificar un cliente


export const putClientes = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            cli_identificacion,
            cli_nombre,
            cli_telefono,
            cli_correo,
            cli_direccion,
            cli_pais,
            cli_ciudad
        } = req.body;

        const [result] = await conmysql.query(
            "UPDATE clientes SET cli_identificacion = ?, cli_nombre = ?, cli_telefono = ?, cli_correo = ?, cli_direccion = ?, cli_pais = ?, cli_ciudad = ? WHERE cli_id = ?",
            [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No se encontró el cliente",
            });
        }

        const [row] = await conmysql.query("SELECT * FROM clientes WHERE cli_id = ?", [id]);
        res.json(row[0]);

    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar el cliente",
            error: error.message,
        });
    }
};

//funciona para modificar un cliente especifico
export const patchClientes = async (req, res) => {
    try {
        const {id} = req.params;
        const {cli_identificacion,cli_nombre,cli_telefono,cli_correo,cli_direccion,cli_pais,cli_ciudad} = req.body;
        const [result] = await conmysql.query(
            "UPDATE clientes SET cli_identificacion = IFNULL(?,cli_identificacion), cli_nombre = IFNULL(?,cli_nombre), cli_telefono = IFNULL(?,cli_telefono), cli_correo = IFNULL(?,cli_correo), cli_direccion = IFNULL(?,cli_direccion), cli_pais =IFNULL(?,cli_pais), cli_ciudad = IFNULL(?,cli_ciudad) WHERE cli_id = ?",
            [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No se encontró el cliente",
            });
        }

        const [row] = await conmysql.query("SELECT * FROM clientes WHERE cli_id = ?", [id]);
        res.json(row[0]);

    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar el cliente",
            error: error.message,
        });
    }
};

//funcion eliminar cliente
export const deleteClientes = async (req, res) => {
    try {
        const [result] = await conmysql.query("DELETE FROM clientes WHERE cli_id = ?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No se encontró el cliente",
            });
        }

        res.sendStatus(204); 

    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar el cliente",
            error: error.message
        });
    }
};