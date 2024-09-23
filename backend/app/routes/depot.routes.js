const express = require('express');
const router = express.Router();
const depotController = require('../controller/depot.controller');

router.post('/depot',depotController.creerDepot);
router.get('/depot',depotController.listeDepot);
router.delete('/depot/:id_dep',depotController.supprimerDepot);
router.put('/depot/:id_dep',depotController.modificationDepot);
router.get('/depot/:id_dep',depotController.getIdStock);
router.get('/depot/page/count',depotController.countDepot);

module.exports = router;