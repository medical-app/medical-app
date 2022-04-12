const { response } = require('express');

const jwt = require('jsonwebtoken');
const Config = require('../config/config');
const config = new Config();
const User = require("../models/user");

const validarJWT = async(req, res = response, next )=>{

    const token = req.header('x-token');
    if(!token) return res.status(401).json({"Mensaje": "No va token en la peticion"});

    try{
        const { uid } = jwt.verify( token.trim(), config.clave_Secreta );

        const user = new User();
        user.id = uid;
        const infoUser = await user.getIdUser();
        
        if( user.length <=0 ) return res.status(404).json( { "Mensaje": "No existe usuario con el id " + uid } );
        req.user = infoUser[0]; //metemos el usuario en las cabeceras
        next();
        
    }catch( error ){
        console.log(error);
        return res.status(500).json({"Mensaje": "Error al validar el token"})
    }
}

module.exports = validarJWT;