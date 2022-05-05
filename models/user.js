const Conecction = require("../config/connection");
const connection = new Conecction();
const Functions = require("../helpers/functions");
const functions = new Functions();

class User {

    constructor( id, usuario, pass, estatus, created_at, uptaded_at, idRol, idPersona, email ){
        this.id = id;
        this.usuario = usuario,
        this.pass = pass,
        this.estatus = estatus,
        this.created_at = created_at,
        this.uptaded_at = uptaded_at,
        this.idRol = idRol,
        this.idPersona = idPersona,
        this.email = email
    }

    //Obtener usuario por id
    async getIdUser(){
      const query = 'SELECT ID_USUARIO, ID_ROL, ID_PERSONA, CORREO, USUARIO, PASSWORD FROM USUARIO WHERE ESTATUS = 1 AND ID_USUARIO = ?';
      return await this.functionsDB( query, [ this.id ] );
    }

    //obtener todos los usuarios
     async getAllUser(){
       const query = "SELECT ID_USUARIO, ID_ROL, ID_PERSONA, CORREO, USUARIO FROM USUARIO WHERE ESTATUS = 1;";
       return await this.functionsDB( query );
     }

     //crear usuario
     async createUser(){
       const query = "INSERT INTO USUARIO SET ?";
       const params = {
         "USUARIO": this.usuario,
         "PASSWORD": this.pass,
         "ESTATUS": 1,
         "CREATE_AT":  await functions.formatDate( Date.now() ),
         "UPDATE_AT":  await functions.formatDate( Date.now() ),
         "ID_ROL": this.idRol,
         "ID_PERSONA": this.idPersona,
         "CORREO": this.email
       }
       return await this.functionsDB( query, [params] );
     }

     //editar usuario 
     async updateUser(){
       const query = "UPDATE USUARIO SET ? WHERE ID_USUARIO = ?";
       const params = {
        "USUARIO": this.usuario,
        "UPDATE_AT":  await functions.formatDate( Date.now() ),
        "ID_ROL": this.idRol,
        "ID_PERSONA": this.idPersona,
        "CORREO": this.email
      }
      return await this.functionsDB( query, [params, this.id] );
     }

     //eliminar usuario
     async deleteUser(){
       const query = `UPDATE USUARIO SET ESTATUS = 0 WHERE ID_USUARIO = ${this.id}`;
       return await this.functionsDB( query );
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