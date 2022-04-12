const Conecction = require("../config/connection");
const connection = new Conecction();


class Login{

    constructor( password, correo, usuario ){
        this.password = password,
        this.correo = correo,
        this.usuario = usuario
    }

    //validar credenciales
    async validateCreden(){
        const query = "SELECT CORREO, ID_USUARIO FROM USUARIO WHERE CORREO = ? AND PASSWORD = ? AND ESTATUS = 1; ";
        return await this.functionsDB( query, [ this.correo, this.password ] );
    }

    

    async functionsDB(query, params = []){
        try {
            const result = connection.con.query( query, params );
            return result;
        } catch (error) {
            console.log("Error al hacer la peticion a la base de datos", error );
            return false;
        }
    }

}

module.exports = Login;