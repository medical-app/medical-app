const { Router } = require('express');
const { getAll, create, getById, update, deletePersona } = require("../controllers/persona");
const router = Router();


router.get('/', getAll );

router.post('/', create );

router.get('/:id', getById );

router.put('/:id',update );

router.delete('/:id', deletePersona );



module.exports = router;