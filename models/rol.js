const Conecction = require("../config/connection");
const connection = new Conecction();
const Functions = require("../helpers/functions");
const functions = new Functions();

class Rol{

    constructor( id, descripcion, estatus, created_at, updated_at ){
        this.id = id,
        this.descripcion = descripcion,
        this.estatus = estatus,
        this.created_at = created_at,
        this.updated_at = updated_at
    }

    //obtener todos los rol
    async getAllRol(){
        const query = 'SELECT ID_ROL, DESCRIPCION, ESTATUS FROM ROL WHERE ESTATUS = 1';
        return await this.functionsDB( query );
    }

    // obtener rol por id
    async getIdRol(){
        const query = 'SELECT * FROM ROL WHERE ESTATUS = 1 AND ID_ROL = ?;';
        return await this.functionsDB( query, [this.id]);

    }

    //obtener toodos los rol, clasificando por tipo de rol
    async getAllTypeRol(){
        const query = 'SELECT * FROM ROL WHERE DESCRIPTION = ?;';
        return await this.functionsDB( query, [ this.descripcion ] );
    }

    //agregar rol
    async postRol(){
        const query = 'INSERT INTO ROL SET ?';
        const params = {
           "DESCRIPCION": this.descripcion,
           "ESTATUS": 1,
           "CREATE_AT": await functions.formatDate( Date.now() ),
           "UPDATE_AT": await functions.formatDate( Date.now() )
        }

        return await this.functionsDB( query, [ params ] );

    }

    //editar rol
    async putRol(){
        const query = `UPDATE ROL SET ? WHERE ID_ROL = ?;`;
        const params = {
            "DESCRIPCION": this.descripcion,
            "UPDATE_AT": await functions.formatDate( Date.now() )
         }
        return await this.functionsDB( query, [ params, this.id ] );
    }

    //eliminar rol
    async deleteRol(){
        const query = 'UPDATE ROL SET ESTATUS = 0, UPDATE_AT = ? WHERE ID_ROL = ?;';
        const params = [ await functions.formatDate( Date.now() ), this.id  ];
        return await this.functionsDB( query, params );
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



module.exports = Rol;