class Config{
    constructor(){
        /*this.confConnection = {
            host: "blqptt7g05ik5jvo4nbi-mysql.services.clever-cloud.com",
            user: "uwklp79oew0ultw7",
            password: "zp97OWt0EuttWRhXwNCX",
            database: "blqptt7g05ik5jvo4nbi"
        }*/
       this.confConnection = {
            host: "localhost",
            user: "root",
            password: "47293202axel",
            database: "blqptt7g05ik5jvo4nbi"
        }

        this.clave_Secreta = "45ta351a11av35creta123123?¿";
    }
}

/*
    MYSQL_ADDON_HOST=blqptt7g05ik5jvo4nbi-mysql.services.clever-cloud.com
    MYSQL_ADDON_DB=blqptt7g05ik5jvo4nbi
    MYSQL_ADDON_USER=uwklp79oew0ultw7
    MYSQL_ADDON_PORT=3306
    MYSQL_ADDON_PASSWORD=zp97OWt0EuttWRhXwNCX 
    MYSQL_ADDON_URI=mysql://uwklp79oew0ultw7:zp97OWt0EuttWRhXwNCX@blqptt7g05ik5jvo4nbi-mysql.services.clever-cloud.com:3306/blqptt7g05ik5jvo4nbi
*/

module.exports = Config