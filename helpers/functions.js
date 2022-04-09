
class Functions{

    //darle formato a la fecha
    async formatDate( datenow ){
          // se le dara formato a la fecha
          const date = new Date( datenow );
          const year = date.getFullYear();
          const day = ( date.getDate() < 10 )? `0${date.getDate()}` : date.getDate();
          const mont = ( date.getMonth() < 9 )? `0${date.getMonth() + 1 }` : date.getMonth() + 1;
          const hor = date.getHours();
          const min = date.getMinutes();
          const seconds = date.getSeconds();
          const fecha = `${year}-${mont}-${day} ${hor}:${min}:${seconds}`;
          console.log("fecha", fecha );
          return fecha;
    }

    //limpiar string con espacios
    async clearString( cadena ){
        return cadena.replace(/[^A-Za-z\ ]/gi, "");
    }

    //limpiar numero
    async clearNumber( numero ){
        return numero.replace(/[^0-9]/gi, "");
    }
}

module.exports = Functions;