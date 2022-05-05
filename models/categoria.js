const Conecction = require("../config/connection");
const connection = new Conecction();

class Categoria {
    constructor( id, nombre ){
        this.id = id, 
        this.nombre = nombre
    }

    async getAll(){
        const query = "SELECT * FROM CATEGORIA WHERE ESTATUS = 1;"
        return await this.functionsDB( query );
    }

    async getId(){
        const query = "SELECT * FROM CATEGORIA WHERE ESTATUS != 0 AND ID_CATEGORIA = ?";
        return await this.functionsDB( query, [this.id] );
    }

    async create(){
        const query = "INSERT INTO CATEGORIA SET ?";
        const params = {
            "NOMBRE_CATEGORIA": this.nombre,
            "ESTATUS": 1
        }
        return await this.functionsDB( query, [params] );
    }

    async deleteCategoria(){
        const query = "UPDATE CATEGORIA SET ESTATUS = 0 WHERE ID_CATEGORIA = ?";
        return await this.functionsDB( query, [this.id] );
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

module.exports = Categoria;