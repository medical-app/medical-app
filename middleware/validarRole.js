const { response } = require('express');
const Rol = require("../models/rol");
const rol = new Rol();

//validar si es rol SUPER
const isSuperRol = async( req, res = response, next )=>{
    if( !req.user ) return res.status(500).json( {"Mensaje": "Se quiere validar el rol, sin validar el token de primero"} );

    const infUser = req.user;
    rol.id =  infUser.ID_ROL
    const infoRol = await rol.getIdRol();

    if( infoRol.length <=0 ) return res.status(401).json( {"Mensaje": "Rol no valido"} );
    if( infoRol[0].DESCRIPCION != "SUPER") return res.status(401).json({"Mensaje": `El usuario ${infUser.USUARIO}, no tiene permisos, para ejecutar esta tarea `})
    
    next();
}

module.exports = isSuperRol;