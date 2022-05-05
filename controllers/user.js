const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const User = require("../models/user");
const user  = new User();



const getAll = async ( req = request, res = response ) => {
    const AllUser = await user.getAllUser();
    if(!AllUser) return res.status(500).json({"Mensaje": "No se pudo obtener todos los usuarios"});
    res.status(200).json({
        Total: AllUser.length,
        users: AllUser
    });
}

const getById = async ( req = request, res = response ) => {

    const { id } = req.params;
    user.id = id;
    const userInfo = await user.getIdUser();
    if(!userInfo) return res.status(500).json({"Mensaje": "no se pudo obtener el usuario con el id: " + id});


    res.status(200).json({
        userInfo
    });
}

const create = async( req = request, res = response ) => {

    const {USUARIO, PASSWORD, ID_ROL, ID_PERSONA, CORREO} = req.body;
    // encriptar la contrasenia 
    const salt = bcryptjs.genSaltSync(10);
    user.pass = bcryptjs.hashSync( PASSWORD, salt );

    user.usuario = USUARIO;
    user.idRol = ID_ROL;
    user.idPersona = ID_PERSONA;
    user.email = CORREO;
    const createUser = await user.createUser();
    if(!createUser) return res.status(500).json({"Mensaje": "Error al intentar agregar al usuario"});

    res.status(200).json({
        msg: 'post create user',
        createUser
    });
}

//editar el usuario
const update = async( req = request, res = response ) => {

    const { id } = req.params;
    const {USUARIO, ID_ROL, ID_PERSONA, CORREO} = req.body;

    user.id = id;
    user.usuario = USUARIO;
    user.idRol = ID_ROL;
    user.idPersona = ID_PERSONA;
    user.email = CORREO;
    const updateUser = await user.updateUser();
    if(!updateUser) return res.status(500).json({"Mensaje": "Error al intentar actualizar al usuario con id: "+id});


    res.status(200).json({
        msg: 'put update user ',
        updateUser,
    });
}

//eliminar usuario
const deleteUser = async( req = request, res = response ) => {
    const { id } = req.params;
    user.id = id;
    const deleteUser = await user.deleteUser();
    if(!deleteUser) return res.status(500).json({"Mensaje": "Error al intentar eliminar al usuario con id: "+id});


    res.status(200).json({
        msg: 'delete user or update state users',
        deleteUser
    });
}


const getParams = async( req = request, res = response ) => {

    const query = req.query;

    
    res.status(200).json({
        msg: 'delete user or update state users',
        query
    });
}



module.exports = {
    getAll,
    getById,
    update,
    deleteUser,
    create,
    getParams
}