const {request, response} = require("express");
const Cita = require("../models/cita");
const cita = new Cita();

const getAll = async ( req = request, res = response )=> {
    const citas = await cita.getAll();

    res.status(200).json({
        "mensaje": "todos los ususdsadarios",
        "total": cita.length,
        citas
    });
}

const getId = async ( req = request, res = response )=> {
    const {id}= req.params;
    cita.id = id;
    const infoCita = await cita.getId();

    res.status(200).json({
        "mensaje": "Informacion de la cita",
        infoCita
    });
}

const create = async ( req = request, res = response )=> {

    const { FECHA_CITA, HORA_CITA, DESCRIPCION, MEDICO_ID_PERSONA, ID_USUARIO, ID_CONSULTORIO } = req.body;    
    cita.fecha = FECHA_CITA;
    cita.hora = HORA_CITA;
    cita.descripcion =  DESCRIPCION;
    cita.idMedico = MEDICO_ID_PERSONA;
    cita.idUsuario = ID_USUARIO;
    cita.idConsultorio = ID_CONSULTORIO;

    const addCita = await cita.createCita();

    res.status(200).json({
        "mensaje": "Se creo la citaCorrectamente",
        addCita
    });
}

const updteCita = async ( req = request, res = response )=> {

    const {id}= req.params;
    const { FECHA_CITA, HORA_CITA, DESCRIPCION, MEDICO_ID_PERSONA, ID_USUARIO, ID_CONSULTORIO } = req.body;    
    cita.id = id;
    cita.fecha = FECHA_CITA;
    cita.hora = HORA_CITA;
    cita.descripcion =  DESCRIPCION;
    cita.idMedico = MEDICO_ID_PERSONA;
    cita.idUsuario = ID_USUARIO;
    cita.idConsultorio = ID_CONSULTORIO;

    const updateCita = await cita.updateCita();
    res.status(200).json({
        "mensaje": "Se edito la cita correctamente",
        updateCita
    });
}


//eliminar la cita
const deleteCita = async ( req = request, res = response )=> {

    const {id}= req.params;
    cita.id = id;

    const deleteCita = await cita.deleteCita();
    res.status(200).json({
        "mensaje": "Se elimino la cita",
        deleteCita
    });
}

module.exports = {
    getAll,
    getId,
    create,
    updteCita,
   deleteCita
}