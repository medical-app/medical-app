const { Router } = require('express');
const { check } = require('express-validator');

const { loginUser } =require("../controllers/login");
const { validateFields } = require("../middleware/validateFields");
const FuncionesVarias = require("../middleware/funcionesVarias");
const fv = new FuncionesVarias();

const router = Router();

router.post('/',[
    check("CORREO", "El correo es requerido").not().isEmpty(),
    check("CORREO", "El correo no es valido").isEmail(),
    check("PASSWORD", "La Contraseña tiene que tener mas entre 8 y 16 caracteres").isLength({ min:8, max: 16} ),
    check("PASSWORD").custom( fv.validatePassword ),
    validateFields
],  loginUser );

module.exports = router; 