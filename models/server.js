
const express = require('express');
const cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = 3330;

        // dividir las rutas
        this.paths = {
            user: '/api/user',
            persona: "/api/persona",
            rol: "/api/rol",
            login: "/api/login",
            img: "/api/img",
            medico: "/api/medico",
            consultorio: "/api/consultorio",
            cita: "/api/cita",
            categoria: "/api/categoria"
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
       this.app.use( this.paths.medico,      require('../routes/medico'));
       this.app.use( this.paths.consultorio, require('../routes/consultorio'));
       this.app.use( this.paths.cita,        require('../routes/cita'));
       this.app.use( this.paths.categoria,   require('../routes/categoria'));
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log( 'Servidor conrriendo en el puerto ' + this.port );
        });
    }
}
module.exports = Server;