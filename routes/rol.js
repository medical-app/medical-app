const { Router } = require('express');
const { check } = require('express-validator');

const { getAll, create, getById, update, deleteRol, getAllTypeRol } = require("../controllers/rol");

const validateJWT = require("../middleware/validateJWT");
const {isSuperRol, hasRole} = require("../middleware/validarRole");
const { validateFields } = require("../middleware/validateFields");
const FuncionesVarias = require("../middleware/funcionesVarias");
const fv = new FuncionesVarias();

const router = Router();

router.get('/',      [validateJWT, hasRole( 'ADMINISTRADOR', 'SUPER' ), validateFields], getAll );

router.post('/',     [ 
    validateJWT,
    hasRole( 'ADMINISTRADOR', 'SUPER' ),
    check('DESCRIPCION', "La DESCRIPCION del rol es necesaria").not().isEmpty().isString(),
    check('DESCRIPCION', "La DESCRIPCION tiene que ser un string").isString(),
    check('DESCRIPCION').custom( fv.existeRol ),
    validateFields
], create );

router.get('/:id',   [ 
    validateJWT,
    hasRole( 'ADMINISTRADOR', 'SUPER' ),
    validateFields
], getById );

router.get('/type/',  [validateJWT, hasRole( 'ADMINISTRADOR', 'SUPER' ), validateFields], getAllTypeRol );

router.put('/:id',    [validateJWT, hasRole( 'ADMINISTRADOR', 'SUPER' ), validateFields], update );

router.delete('/:id', [validateJWT, hasRole( 'ADMINISTRADOR', 'SUPER' ), validateFields], deleteRol );



module.exports = router;  