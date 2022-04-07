const mysql = require("mysql");
const { promisify } = require("util");
const Config = require("../config/config");
const confing = new Config();

class Connection{

    constructor(){
        this.con;
        this.mysql = mysql;
        this.connection();
    }
    connection(){
        const conn = this.mysql.createPool( confing.confConnection );
        conn.getConnection((err, connect )=>{
            if(err){
                if (err.code === 'PROTOCOL_CONNECTION_LOST') console.error('Conexion a la base de datos cerrada');
        
                if (err.code === 'ER_CON_COUNT_ERROR') console.error('Sin conexiones a la base de datos');
        
                if (err.code === 'ECONNREFUSED') console.error('Conexion rechazada');
            }
            if (connect) connect.release();
            console.log("Connected to the database");
            return;
        });
       conn.query = promisify( conn.query );
       this.con=conn;
    }
}

module.exports = Connection;