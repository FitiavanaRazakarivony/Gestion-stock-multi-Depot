const express = require('express');
const router = express.Router();
const mouvementController = require('../controller/mouvement.controller');
const { authenticate } = require('../controller/Auth.controller');

router.post('/mouvement',authenticate,mouvementController.creerMouvement);
router.get('/mouvement',mouvementController.listeMouvement);
router.delete('/mouvement/:id_mvt',mouvementController.supprimerMouvement);
router.put('/mouvement/:id_mvt',authenticate,mouvementController.modificationMouvement);
router.get('/mouvement/:id_mvt',mouvementController.getIdMouv);
router.get('/mouvement/count/:id_p',mouvementController.contProduiMouvement);

// router.get('/mouvement/produitDetails',mouvementController.produitDetails);

module.exports = router;