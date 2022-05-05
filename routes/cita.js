const { Router } = require('express');
const { getAll, getId, create, updteCita, deleteCita } = require('../controllers/cita');

const router = Router();

router.get('/', getAll );

router.post('/', create );

router.get('/:id', getId );
 
router.put('/:id', updteCita );

router.delete('/:id', deleteCita );

module.exports = router;