const express = require('express');
const router = express.Router();
const emplacementController = require('../controller/emplacement.controller');

router.post('/emplacement',emplacementController.creeremplacement)
router.get('/emplacement',emplacementController.listeemplacement)
router.delete('/emplacement/:id_em',emplacementController.supprimeremplacement)
router.put('/emplacement/:id_em',emplacementController.modificationemplacement)
router.get('/emplacement/:id_em',emplacementController.getIdEmplacement)
router.get('/emplacement/page/count',emplacementController.countEmplacements);

module.exports = router