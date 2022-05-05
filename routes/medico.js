const { Router } = require('express');
const {getAll, getIdMedico, createMedico, updateMedico, deleteMedico }= require('../controllers/medico');
const router = Router();

router.get('/', getAll );

router.post('/', createMedico );

router.get('/:id', getIdMedico );
 
router.put('/:id',updateMedico );

router.delete('/:id', deleteMedico );

module.exports = router;