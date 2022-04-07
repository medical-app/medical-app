const Conecction = require("../config/connection");
const connection = new Conecction();

class User {

    constructor(){

    }

    probarConeccion(){
      return true;
    }

}

module.exports = User;