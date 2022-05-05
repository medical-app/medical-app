const { Router } = require('express');
const  { getAllCategoria, getIdCategoria, addCategoria, deleteCategoria } = require("../controllers/categoria")

const router = Router();


router.get('/', getAllCategoria );

router.post('/', addCategoria );

router.get('/:id', getIdCategoria );
 
router.delete('/:id', deleteCategoria );


module.exports = router;