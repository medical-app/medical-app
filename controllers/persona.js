const { response, request } = require('express');
const Persona = require("../models/persona");
const persona = new Persona();

// obtener todas las personas
const getAll = async ( req = request, res = response ) => {
    const totalPersonas = await persona.getPersona();
    return res.status(200).json({
        Total: totalPersonas.length,
        Personas: totalPersonas
    });
}


// agregar persona
const create = async( req = request, res = response ) => {

    const {PRI_APELLIDO, SEG_APELLIDO, NOMBRE, FECHA_NACIMIENTO, CORREO, DIRECCION, TELEFONO, FOTO_PERFIL, ESTATUS } = req.body;
    persona.primerApellido  = PRI_APELLIDO.toUpperCase();
    persona.segundoApellido = SEG_APELLIDO.toUpperCase();
    persona.nombre          = NOMBRE.toUpperCase();
    persona.fechaNacimiento = FECHA_NACIMIENTO;
    persona.correo          = CORREO.toUpperCase();
    persona.direccion       = DIRECCION.toUpperCase();
    persona.telefono        = TELEFONO;
    persona.foto            = FOTO_PERFIL;
    persona.estatus         = ESTATUS;

    const result = await persona.postPersona();
    if( !result ) return res.status(500).json({"Mensaje": "Error al agregar a ala persona"})
    console.log("resultado de agregar a la persona", result );

    return res.status(200).json({
        msg: 'se a creado la persona correctamente',
        "Persona": persona
    });
}


// obtener persona por id
const getById = async ( req = request, res = response ) => {

    const { id } = req.params;
    persona.id = id;
    const getPersona = await persona.getIdPersona();

   return res.status(200).json({
        "Persona": getPersona
    });
}



// actualizar informacion de la persona
const update = async( req = request, res = response ) => {

    const {PRI_APELLIDO, SEG_APELLIDO, NOMBRE, FECHA_NACIMIENTO, CORREO, DIRECCION, TELEFONO, FOTO_PERFIL  } = req.body;
    const { id } = req.params;
  
    persona.id              = id;
    persona.primerApellido  = PRI_APELLIDO.toUpperCase();
    persona.segundoApellido = SEG_APELLIDO.toUpperCase();
    persona.nombre          = NOMBRE.toUpperCase();
    persona.fechaNacimiento = FECHA_NACIMIENTO;
    persona.correo          = CORREO.toUpperCase();
    persona.direccion       = DIRECCION.toUpperCase();
    persona.telefono        = TELEFONO;
    persona.foto            = FOTO_PERFIL;
    const updatePersona = await persona.putPersona();
    const getPersona = await persona.getIdPersona();

    return  res.status(200).json({
        msg: 'put update user ',
        getPersona
    });
}


const deletePersona = async( req = request, res = response ) => {
    const { id } = req.params;
    persona.id = id;
    const deleteP = await persona.deletePersona(); 


    return res.status(200).json({
        msg: 'delete user or update state users',
        deleteP
    });
}

module.exports = {
    deletePersona,
    getAll,
    create,
    getById,
    update,
    deletePersona
}