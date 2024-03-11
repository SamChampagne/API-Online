const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateur.controller')
const validation = require("../middleware/authentification.middleware")

router.get('/liste', utilisateurController.Liste);
router.post('/ajouter', utilisateurController.AjouterUsager);
router.get('/recuperation', utilisateurController.Recuperation);
module.exports = router;