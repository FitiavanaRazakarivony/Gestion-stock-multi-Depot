const express = require('express');
const router = express.Router();
const produitController = require('../controller/produit.controller');

router.post('/produit',produitController.creerProduit);
router.get('/produit',produitController.listeProduit);
router.delete('/produit/:id_p',produitController.supprimerProduit);
router.put('/produit/:id_p',produitController.modificationProduit);
router.get('/produit/count',produitController.countProduit);

router.get('/produit/detailProduit/:id_p', produitController.detailProduit)
router.get('/produit/afficherProduit',produitController.afficherProduit);

module.exports = router;