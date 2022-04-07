
const express = require('express');
const cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = 3330;

        // dividir las rutas
        this.paths = {
            user: '/api/users'
        }

        // middlewares
        this.middlewares();

        // rutas
        this.routes();

    }

    middlewares(){

        // CORS
        this.app.use( cors() );

        // leer y pasar los datos del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static('public'));
    }

    routes(){

       this.app.use(this.paths.user, require('../routes/user'));
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log( 'Servidor conrriendo en el puerto ' + this.port);
        });
    }
}




module.exports = Server;