const { Router } = require('express');
const {    getAll, getId, create, update, deleteC } = require("../controllers/consultorio");

const router = Router();

router.get('/', getAll );

router.post('/', create );

router.get('/:id', getId );
 
router.put('/:id', update );

router.delete('/:id', deleteC );

module.exports = router;