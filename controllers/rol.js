const { response, request } = require('express');
const Rol = require("../models/rol");
const rol = new Rol();


//obtener todos los roles
const getAll = async ( req = request, res = response ) => {
    const totalRol = await rol.getAllRol();
    return res.status(200).json({
        Total: totalRol.length,
        Roles: totalRol
    });
}



// crear rol
const create = async( req = request, res = response ) => {

    const { DESCRIPCION  } = req.body;
    rol.descripcion = DESCRIPCION;
    
    const result = await rol.postRol();
    if( !result ) return res.status(500).json({"Mensaje": "Error al agregar el rol"});

    return res.status(200).json({
        "Mensaje": "Se creo el rol correctamente",
        "Rol": rol
    });
}


//obtener rol por id
const getById = async ( req = request, res = response ) => {

    const { id } = req.params;
    rol.id = id;
    const getRol = await rol.getIdRol();

    if(!getRol) return res.status(500).json({"Mensaje": "Error al traer  el rol"});
    return res.status(200).json( { Rol: getRol } );
    
}



//Obtener rol por su tipo
const getAllTypeRol = async ( req = request, res = response ) => {
    const { descripcion } = req.query;
    rol.descripcion = descripcion;
    const getRol = await rol.getAllTypeRol();

    if(!getRol) return res.status(500).json({"Mensaje": "Error al traer  el rol"});
    return res.status(200).json( { Rol: getRol } );
}



// editar rol
const update = async( req = request, res = response ) => {
    const { DESCRIPCION  } = req.body;
    const { id } = req.params;
    rol.id = id;
    rol.descripcion = DESCRIPCION;
    const upRol = await rol.putRol();

    if(!upRol) return res.status(500).json({"Mensaje": "Error al traer  el rol"});
    return res.status(200).json({ rol: upRol });
}



// eliminar rol
const deleteRol = async( req = request, res = response ) => {
    const { id } = req.params;
    rol.id = id;
    const deleteP = await rol.deleteRol();

    return res.status(200).json({
        "Mesage": "se elimino el rol",
        rol
    });
}

module.exports = {
    getAll,
    getAllTypeRol,
    create,
    getById,
    update,
    deleteRol
}

    