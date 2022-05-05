const Conecction = require("../config/connection");
const connection = new Conecction();
const Functions = require("../helpers/functions");
const functions = new Functions();

class consultorio {

    constructor(id, direccion, descripcion, estatus ){
        this.id = id,
        this.direccion = direccion,
        this.descripcion = descripcion,
        this.estatus = estatus
    }

    async getAll(){
        const query = "SELECT ID_CONSULTORIO, DIRECCION, DESCRIPCION FROM CONSULTORIO WHERE ESTATUS = 1";
        return await this.functionsDB( query );
    }

    async getId(){
        const query = "SELECT ID_CONSULTORIO, DIRECCION, DESCRIPCION FROM CONSULTORIO WHERE ESTATUS = 1 AND ID_CONSULTORIO = ?";
        return await this.functionsDB(query, [this.id]);
    }

    async addConsultorio(){
        const query = "INSERT INTO CONSULTORIO SET ?";
        const params = {
            "DIRECCION" : this.direccion,
            "DESCRIPCION": this.descripcion,
            "CREATED_AT": await functions.formatDate( Date.now() ),
            "UPDATED_AT": await functions.formatDate( Date.now() ),
            "ESTATUS": 1
        }
        return await this.functionsDB(query,[params]);
    }

    async updateConsultorio(){
        const query = "UPDATE CONSULTORIO SET ? WHERE ID_CONSULTORIO = ?";
        const params = {
            "DIRECCION" : this.direccion,
            "DESCRIPCION": this.descripcion,
            "UPDATED_AT": await functions.formatDate( Date.now() ),
        }
        return await this.functionsDB(query,[params, this.id]);
    }

    async deleteConsultorio(){
        const query = "UPDATE CONSULTORIO SET ESTATUS = 0 WHERE ID_CONSULTORIO = ?";
        return await this.functionsDB(query,[ this.id]);

    }
    // funcion que hace la peticion a las base de datos
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

module.exports = consultorio;