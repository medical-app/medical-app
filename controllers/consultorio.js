const { response, request } = require('express');
const Consultorio = require('../models/consultorio');
const consultorio = new Consultorio();

const getAll = async( req = request, res = response )=>{

    const consultorios = await consultorio.getAll();
    if(!consultorios) return res.status(500).json({"Mensaje": "No se pudo obtener todos los consultorios"});

    res.status(200).json({
        "total": consultorios.lenght,
        consultorios
    });
}

const getId = async( req = request, res = response )=>{

    const {id} = req.params;
    consultorio.id = id;
    const infoConsultorio = await consultorio.getId();
    if(!infoConsultorio) return res.status(500).json({"Mensaje": "No se pudo obtener el consultorio con el id: " +id});

    res.status(200).json({
        "mensaje": "Informacion del consultorio",
        infoConsultorio
    });

}

const create = async( req = request, res = response )=>{

    const { DIRECCION, DESCRIPCION} = req.body;
    consultorio.direccion = DIRECCION;
    consultorio.descripcion = DESCRIPCION;
    const add = await consultorio.addConsultorio();
    if(!add) return res.status(500).json({"Mensaje": "No se pudo agregar el consultorio"});

    res.status(200).json({
        "mensaje": "Se agrego correctamente el consultorio",
        add
    });

}

const update = async( req = request, res = response )=>{
    const { DIRECCION, DESCRIPCION} = req.body;
    const {id} = req.params;
    consultorio.id = id;
    consultorio.direccion = DIRECCION;
    consultorio.descripcion = DESCRIPCION;

    const updateConsultorio = await consultorio.updateConsultorio();
    if(!add) return res.status(500).json({"Mensaje": "No se pudo editar el consultorio con el id: "+id});

    res.status(200).json({
        "mensaje": "Se edito correctamente el consultorio",
        updateConsultorio
    });

}

const deleteC = async( req = request, res = response )=>{
    const {id} = req.params;
    consultorio.id = id;
    const deleteConsultorio = await consultorio.deleteConsultorio();
    if(!deleteConsultorio) return res.status(500).json({"Mensaje": "No se pudo eliminar el consultorio con el id: "+id});

    res.status(200).json({
        "mensaje": "Se elimino los consultorios",
        deleteConsultorio
    });

}


module.exports = {
    getAll,
    getId,
    create,
    update,
    deleteC
}