const Conecction = require("../config/connection");
const connection = new Conecction();
const Functions = require("../helpers/functions");
const functions = new Functions();


class Cita {

    constructor(id, fecha, hora, descripcion, estatus, create_at, update_at, idMedico, idUsuario, idConsultorio){
            this.id = id,
            this.fecha = fecha,
            this.hora = hora,
            this.descripcion = descripcion,
            this.estatus = estatus,
            this.create_at = create_at,
            this.update_at = update_at,
            this.idMedico = idMedico,
            this.idUsuario = idUsuario,
            this.idConsultorio = idConsultorio
    }

    async getAll(){
        const query = "SELECT * FROM cita WHERE ESTATUS !=0;"
        return await this.functionsDB( query );
    }

    async getId(){
        const query = "SELECT * FROM cita WHERE ESTATUS != 0 AND ID_CITA = ?";
        return await this.functionsDB( query, [this.id] );

    }

    async createCita(){
        const query = "INSERT INTO CITA SET ?";
        const params = {
            "FECHA_CITA": this.fecha,
            "HORA_CITA" : this.hora,
            "DESCRIPCION": this.descripcion,
            "ESTATUS": 1,
            "CREATE_AT": await functions.formatDate( Date.now() ),
            "UPDATE_AT": await functions.formatDate( Date.now() ),
            "MEDICO_ID_PERSONA": this.idMedico,
            "ID_USUARIO": this.idUsuario,
            "ID_CONSULTORIO": this.idConsultorio
        }
        return await this.functionsDB( query, [params] );
    }

    async updateCita(){
        const query = "UPDATE CITA SET ? WHERE ID_CITA = ?";
        const params = {
            "FECHA_CITA": this.fecha,
            "HORA_CITA" : this.hora,
            "DESCRIPCION": this.descripcion,
            "UPDATE_AT": await functions.formatDate( Date.now() ),
            "MEDICO_ID_PERSONA": this.idMedico,
            "ID_USUARIO": this.idUsuario,
            "ID_CONSULTORIO": this.idConsultorio
        }
        return await this.functionsDB( query, [params, this.id ] );
    }

    async deleteCita(){
        const query = "UPDATE CITA SET ESTATUS = 0 WHERE ID_CITA = ?";
        return await this.functionsDB( query, [this.id ] );
        
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

module.exports = Cita;