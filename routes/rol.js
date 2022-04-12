const { Router } = require('express');
const { getAll, create, getById, update, deleteRol, getAllTypeRol } = require("../controllers/rol");

const validateJWT = require("../middleware/validateJWT");
const validateRol = require("../middleware/validarRole");
const router = Router();

router.get('/',      [validateJWT, validateRol], getAll );

router.post('/',      [validateJWT], create );

router.get('/:id',    [validateJWT], getById );

router.get('/type/',  [validateJWT], getAllTypeRol );

router.put('/:id',    [validateJWT], update );

router.delete('/:id', [validateJWT], deleteRol );



module.exports = router;