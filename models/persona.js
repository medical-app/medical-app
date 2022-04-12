const Conecction = require("../config/connection");
const connection = new Conecction();
const Functions = require("../helpers/functions");
const functions = new Functions();

class Persona{

    constructor(id, primerApellido, segundoApellido, nombre, fechaNacimiento, correo, direccion, telefono, foto, estatus, create, update ){
        this.id = id,
        this.primerNombre = primerApellido,
        this.segundoNombre = segundoApellido,
        this.nombre = nombre,
        this.fechaNacimiento = fechaNacimiento,
        this.correo = correo,
        this.direccion = direccion,
        this.telefono = telefono,
        this.foto = foto,
        this.estatus = estatus,
        this.create = create,
        this.update = update
    }

    // obtener todo de la tabla persona
    async getPersona(){
        const query = `SELECT ID_PERSONA, PRI_APELLIDO, SEG_APELLIDO, NOMBRE, FECHA_NACIMIENTO, CORREO, DIRECCION, TELEFONO, FOTO_PERFIL FROM PERSONA WHERE ESTATUS = 1; `;
        return await this.functionsDB( query );
    }

    // obtener persona por el id
    async getIdPersona(){
        const query = "SELECT ID_PERSONA, PRI_APELLIDO, SEG_APELLIDO, NOMBRE, FECHA_NACIMIENTO, CORREO, DIRECCION, TELEFONO, FOTO_PERFIL FROM PERSONA WHERE ID_PERSONA = ? ";
        return await this.functionsDB( query, [ this.id ] );
    }

    // obtner persona por Correo
    async getEmailPersona(){
        const query = "SELECT ID_PERSONA, PRI_APELLIDO, SEG_APELLIDO, NOMBRE, FECHA_NACIMIENTO, CORREO, DIRECCION, TELEFONO, FOTO_PERFIL FROM PERSONA WHERE CORREO = ? ";
        return await this.functionsDB( query, [ this.correo ] );
    }

    // agregar persona
    async postPersona(){
        const query = `INSERT INTO PERSONA SET ?`;
        const params = {
            "PRI_APELLIDO": this.primerApellido,
            "SEG_APELLIDO": this.segundoApellido,
            "NOMBRE": this.nombre,
            "FECHA_NACIMIENTO": this.fechaNacimiento,
            "CORREO": this.correo,
            "DIRECCION": this.direccion,
            "TELEFONO": this.telefono,
            "FOTO_PERFIL": this.foto,
            "ESTATUS": 1,
            "CREATE_AT": await functions.formatDate( Date.now() ),
            "UPDATE_AT": await functions.formatDate( Date.now() )
        }
        return await this.functionsDB( query, [ params ] );
    }

    // editar persona
    async putPersona(){
        const query = `UPDATE PERSONA SET ? WHERE ID_PERSONA = ?`;
        const params = {
            "PRI_APELLIDO": this.primerApellido,
            "SEG_APELLIDO": this.segundoApellido,
            "NOMBRE": this.nombre,
            "FECHA_NACIMIENTO": this.fechaNacimiento,
            "CORREO": this.correo,
            "DIRECCION": this.direccion,
            "TELEFONO": this.telefono,
            "FOTO_PERFIL": this.foto,
            "UPDATE_AT": await functions.formatDate( Date.now() )
        }
        return await this.functionsDB( query, [ params, this.id ] );
    }

    //eliminar persona
    async deletePersona(){
        const query = `UPDATE PERSONA SET ESTATUS = 0 WHERE ID_PERSONA = ${this.id}`;
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
}

module.exports = Persona;