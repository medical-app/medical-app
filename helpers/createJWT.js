const jwt = require('jsonwebtoken');
const Config = require('../config/config');
const config = new Config();

const generateJWT = ( uid = '') => {

    return new Promise ( ( resolve, reject ) => {

        const payload = { uid };

        // gennerar el jwt
        jwt.sign( payload, config.clave_Secreta, {
            expiresIn: '12h'
        }, ( error, token ) => {

            if( error ){
                console.log( error );
                reject( "No se pudo generar el token" )
            }else{
                resolve( token );
            }
        });
    })
}
module.exports = {
    generateJWT
}