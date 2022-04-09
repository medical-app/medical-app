
const express = require('express');
const cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = 3330;

        // dividir las rutas
        this.paths = {
            user: '/api/users',
            persona: "/api/persona",
            rol: "/api/rol",
            login: "/api/login",
            img: "/api/img"
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
       this.app.use( this.paths.user,        require('../routes/user'));
       this.app.use( this.paths.persona,     require('../routes/persona'));
       this.app.use( this.paths.rol,         require('../routes/rol'));
       this.app.use( this.paths.login,       require('../routes/login'));
       this.app.use( this.paths.img,         require('../routes/img'));
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log( 'Servidor conrriendo en el puerto ' + this.port );
        });
    }
}
module.exports = Server;