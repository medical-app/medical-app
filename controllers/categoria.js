const {request, response} = require("express");
const Categoria = require("../models/categoria");
const categoria = new Categoria();

const getAllCategoria = async( req = request, res = response)=>{
    const categorias = await categoria.getAll();

    res.status(200).json({
        "mensaje": "todas las categorias",
        "total": categorias.length,
        categorias
    });
}

const getIdCategoria = async( req = request, res = response)=>{
    const {id}= req.params;
    categoria.id = id;
    const categoriaInfo = await categoria.getId();

    res.status(200).json({
        "mensaje": "informacion de la categoria",
        categoriaInfo
    });
}


const addCategoria = async( req = request, res = response)=>{
    const {NOMBRE}= req.body;
    categoria.nombre = NOMBRE;
    const addCategoria = await categoria.create();

    res.status(200).json({
        "mensaje": "Se agrego la categoria con exito",
        addCategoria
    });
}

const deleteCategoria = async( req = request, res = response)=>{

    const {id}= req.params;
    categoria.id = id;
    const deleteCategoria = await categoria.deleteCategoria();
    res.status(200).json({
        "mensaje": "Se elimino la categoria",
        deleteCategoria
    });
}

module.exports = {
    getAllCategoria,
    getIdCategoria ,
    addCategoria,
    deleteCategoria
}