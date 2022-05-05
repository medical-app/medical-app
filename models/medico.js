const Conecction = require("../config/connection");
const connection = new Conecction();
const Functions = require("../helpers/functions");
const functions = new Functions();

class Medico {

    constructor(id, colegiado, created_at, updated_at, id_persona, id_categoria){
        this.id = id,
        this.colegiado = colegiado,
        this.created_at = created_at, 
        this.updated_at = updated_at,
        this.id_persona = id_persona,
        this.id_categoria = id_categoria
    }

    //obtener todos los medicos
    async getAll(){
        const query = 'SELECT * FROM MEDICO WHERE ESTATUS = 1;';  
        return await this.functionsDB( query );
    }

    //obtener por id el medico
    async getIdMedico(){
        const query = "SELECT * FROM MEDICO WHERE ID_MEDICO = ? AND ESTATUS = 1";   
        return await this.functionsDB( query, [ this.id ] );
    }

    //agregar el medico
    async addMedico(){
        const query = "INSERT INTO MEDICO SET ?";
        const params = {
            "COLEGIADO": this.colegiado,
            "CREATE_AT": await functions.formatDate( Date.now() ),
            "UPDATE_AT": await functions.formatDate( Date.now() ),
            "ID_PERSONA" : this.id_persona,
            "ID_CATEGORIA": this.id_categoria,
            "ESTATUS": 1
        }
        return await this.functionsDB( query, [ params ] );
    }

    //editar medico
    async updateMedico(){
        const query = "UPDATE MEDICO SET ? WHERE ID_MEDICO = ?";
        const params = {
            "COLEGIADO": this.colegiado,
            "UPDATE_AT": await functions.formatDate( Date.now() ),
            "ID_PERSONA" : this.id_persona,
            "ID_CATEGORIA": this.id_categoria,
        }
        return await this.functionsDB( query, [ params, this.id ] );
    }

    //eliminar medico
    async deleteMedico(){
        const query = "UPDATE MEDICO SET ESTATUS = 0 WHERE ID_MEDICO = ?";
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
}

module.exports = Medico;