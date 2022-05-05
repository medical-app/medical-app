const { response, request } = require('express');
const Medico = require("../models/medico");
const medico = new Medico();

//llamar a todos los medicos
const getAll = async ( req = request, res = response )=> {

    const Allmedicos = await medico.getAll();
    if(!Allmedicos) return res.status(500).json({"Mensaje": "No se pudo obtener todos los medicos"});
    res.status(200).json({
        "mensaje": "todos los usuarios",
        Allmedicos
    });
}


//obtener medico por id
const getIdMedico = async ( req = request, res = response )=> {
    const {id} = req.params;
    medico.id = id;
    const medicoInfo = await medico.getIdMedico();
    if(!medicoInfo) return res.status(500).json({"Mensaje": "No se pudo obtener la informacion del medico con el id: "+ id});

    res.status(200).json({
        "mensaje": "todos los usuarios",
        medicoInfo
    });
}

//crear medico
const createMedico = async ( req = request, res = response )=> {
    const { COLEGIADO, ID_PERSONA, ID_CATEGORIA } = req.body;
    medico.colegiado = COLEGIADO;
    medico.id_persona = ID_PERSONA;
    medico.id_categoria = ID_CATEGORIA;

    const addMedico = await medico.addMedico();
    if(!addMedico) return res.status(500).json({"Mensaje": "Error al agregar el medico"});

    res.status(200).json({
        "mensaje": "todos los usuarios",
        addMedico
    });
}


const updateMedico = async ( req = request, res = response )=> {

    const { COLEGIADO, ID_PERSONA, ID_CATEGORIA } = req.body;
    const {id} = req.params;
    medico.id = id;
    medico.colegiado = COLEGIADO;
    medico.id_persona = ID_PERSONA;
    medico.id_categoria = ID_CATEGORIA;
    const updateMedico = await medico.updateMedico();
    if(!updateMedico) return res.status(500).json( { "Mensaje": "Error al editar el medico con el id: "+id } );

    res.status(200).json({
        "mensaje": "todos los usuarios",
        updateMedico
    });
}



const deleteMedico = async ( req = request, res = response )=> {
    const {id} = req.params;
    medico.id = id;
    const deleteMedico = await medico.deleteMedico();
    if(!deleteMedico) return res.status(500).json( { "Mensaje": "Error al eliminar el medico con el id: "+id } );

    res.status(200).json({
        "mensaje": "todos los usuarios",
        deleteMedico
    });
}


module.exports = {
    getAll,
    getIdMedico,
    createMedico,
    updateMedico,
    deleteMedico,
}