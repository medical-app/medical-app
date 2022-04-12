const { response, request, json } = require('express');
const Login = require("../models/login");
const login = new Login();
const { generateJWT } = require('../helpers/createJWT');


//Validar el login
const loginUser = async( req = request, res = response ) =>{
    
    const { PASSWORD, EMAIL } = req.body;
    login.correo = EMAIL;
    login.password = PASSWORD;

    const validate = await login.validateCreden();
    if( !validate ) return res.status(500).json({"Mensaje": "Error al validar el usuario"});
    if(validate.length <= 0 ) return res.status(404).json({"Mensaje": `No se encontro el usuario con esas credenciales`});

       // GENERAR EL JWT
    try {
         const token = await generateJWT( validate[0].ID_USUARIO );
         return res.status(200).json( { "Mensaje": "Login correcto", "Token": token } );
    } catch (error) {
        console.log( error );
        return res.status(500).json({"Mensaje": "Error al crear el token"});
    }
}

module.exports = {
    loginUser
}