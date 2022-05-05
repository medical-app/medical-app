const Persona = require("../models/persona");
const persona = new Persona();


class FuncionesVarias{

        //limpiar string con espacios
        async clearStringS( cadena ){
            return cadena.replace(/[^A-Za-z\ ]/gi, "");
        }

         //limpiar string sin espacios
         async clearStringS( cadena ){
            return cadena.replace(/[^A-Za-z]/gi, "");
        }
    
        //limpiar numero
        async clearNumber( numero ){
            return numero.replace(/[^0-9]/gi, "");
        }

        //validar direccion
        async validateAddress( address = ""){
            const addressSa = address.replace(/[^A-Za-záéíóúÁÉÍÓÚ\- ]/gi, "");
            if( addressSa == address ) throw new Error(`Direccion no valida`);
        }

        //existe la persona con el id
        async isvalidateId( id = 0 ){
            persona.id = id;
            const getPersona = await persona.getIdPersona();
            if( getPersona.length <= 0 ) throw new Error(`No existe una persona con el id ${id}`);
        }

        //existe el correo
        async existeEmail( email = ''){
            persona.correo = email.toUpperCase();
            const getPersona = await persona.getEmailPersona();
            if( getPersona.length >0 ) throw new Error(`Ya existe un usuario con el correo ${email}`);
        }

        //validar contraseña
        async validatePassword( pass = ""){
            const erPass =/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,10}$/;
            if( !erPass.test( pass ) ) throw new Error(`La contraseña tiene que tener una Mayuscula, una menuscula, y un numero`);
            
        }

        //validar si existe el rol
        async existeRol( descripcion = "" ){
            console.log(descripcion);
            const Rol = require("../models/rol");
            const rol = new Rol();
            rol.descripcion = descripcion.toUpperCase();
            console.log(rol);

            const getRol = await rol.getAllTypeRol();
            if( getRol > 0 ) throw new Error(`Ya existe un rol con la descripcion: ${ descripcion }`)
        }

        
}

module.exports = FuncionesVarias;