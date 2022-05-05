const { Router } = require('express');
const { check } = require('express-validator');

const { getAll, create, getById, update, deletePersona } = require("../controllers/persona");
const router = Router();

const { validateFields } = require("../middleware/validateFields");
const FuncionesVarias = require("../middleware/funcionesVarias");
const fv = new FuncionesVarias();

const validateJWT = require("../middleware/validateJWT"); 
const { hasRole } = require("../middleware/validarRole");

//obtener todos las personas
router.get('/', validateFields, getAll );

router.post('/',[
    validateJWT,
    check("PRI_APELLIDO", "El primer apellido es obligatorio").not().isEmpty(),
    check("SEG_APELLIDO", " Segundo Apellido no valido").isString(),
    check("NOMBRE", "El nombre es obligatorio").not().isEmpty(),
    check("NOMBRE", "El nombre es obligatorio").isString(),
    check("FECHA_NACIMIENTO", "La fecha de nacimiento es obligatoria").not().isEmpty(),
    check("CORREO", "El correo es obligatorio").not().isEmpty(),
    check("CORREO", "Correo no valido").isEmail(),
    check("CORREO").custom( fv.existeEmail ),
    check("DIRECCION").custom( fv.validateAddress ),
    check("TELEFONO", "Número de telefono no valido").isNumeric(),
    check("FOTO_PERFIL", "La foto de perfil es obligatorio").not().isEmpty(),
    validateFields
], create );


// obtner persona por id
router.get('/:id', [ 
    validateJWT,
    check('id', 'No es un id valido'),
    check('id').custom( fv.isvalidateId ),
    validateFields
], getById );


//editar persona
router.put('/:id',[
    validateJWT,
    check('id', 'No es un id valido').isNumeric(),
    check('id').custom( fv.isvalidateId ),
    check("PRI_APELLIDO", "El primer apellido es obligatorio").not().isEmpty(),
    check("SEG_APELLIDO", " Segundo Apellido no valido").isString(),
    check("NOMBRE", "El nombre es obligatorio").not().isEmpty(),
    check("NOMBRE", "El nombre es obligatorio").isString(),
    check("FECHA_NACIMIENTO", "La fecha de nacimiento es obligatoria").not().isEmpty(),
    check("CORREO", "El correo es obligatorio").not().isEmpty(),
    check("CORREO", "Correo no valido").isEmail(),
    check("CORREO").custom( fv.existeEmail ),
    check("DIRECCION").custom( fv.validateAddress ),
    check("TELEFONO", "Número de telefono no valido").isNumeric(),
    check("FOTO_PERFIL", "La foto de perfil es obligatorio").not().isEmpty(),
    validateFields
],update );


//eliminar persona
router.delete('/:id', [
    validateJWT,
    hasRole( 'SUPER', 'ADMINISTRADOR'  ),
    check('id', 'No es un id valido').isNumeric(),
    check('id').custom( fv.isvalidateId ),
    validateFields
],deletePersona );



module.exports = router;