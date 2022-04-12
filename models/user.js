const Conecction = require("../config/connection");
const connection = new Conecction();

class User {

    constructor( id, usuario, pass, created_at, uptaded_at, idRol, idPersona, email ){
        this.usuario = usuario,
        this.pass = pass,
        this.created_at = created_at,
        this.uptaded_at = uptaded_at,
        this.idRol = idRol,
        this.idPersona = idPersona,
        this.email = email
    }

    async getIdUser(){
      const query = 'SELECT ID_USUARIO, ID_ROL, ID_PERSONA, CORREO, USUARIO, PASSWORD FROM USUARIO WHERE ESTATUS = 1 AND ID_USUARIO = ?';
      return await this.functionsDB( query, [ this.id ] );
      
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

    probarConeccion(){
      return true;
    }

}

module.exports = User;