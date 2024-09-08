const express = require('express');
const router = express.Router();
const utilisateurController = require('../controller/utilisateurController');

router.post('/utilisateur',utilisateurController.creerUtilisateur);
router.get('/utilisateur',utilisateurController.listeUtilisateur);
router.delete('/utilisateur/:id_ut',utilisateurController.supprimerUtilisateur);
router.put('/utilisateur/:id_ut',utilisateurController.modificationUtilisateur);
router.get('/utilisateur/:id_ut',utilisateurController.findUtilisateurById);

module.exports = router;