const { response } = require('express');
const Rol = require("../models/rol");
const rol = new Rol();

//validar el tipo de rol
const hasRole = ( ...roles )=>{
    return async( req, res = response, next )=>{
        if( !req.user ) return res.status(500).json( {"Mensaje": "Se quiere validar el rol, sin validar el token de primero"} );

        const infoRol = await getRol( req.user );
        if( infoRol.length<=0 ) return res.status(404).json( {"Mensaje": "No se encontro informacion relacionada al rol del usuario"})
        console.log(req.user);
        if( !roles.includes( infoRol[0].DESCRIPCION ))return res.status(401).json({"Mensaje": `El usuario ${req.user.USUARIO}, no tiene permisos, para ejecutar esta tarea `});
        next();
    }
}

// hacer la peticion a la base de datos
const getRol = async( user )=>{
    rol.id =  user.ID_ROL
    const infoRol = await rol.getIdRol();
    return infoRol;
} 

module.exports = { hasRole };  