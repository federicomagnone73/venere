const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personaController');
const authMiddleware = require('../middleware/auth'); // Importa il middleware

// Applica il middleware a tutte le rotte di questo file
router.use(authMiddleware);

// Ora queste rotte sono protette
router.get('/', personaController.getAll);
router.post('/', personaController.create);

module.exports = router;
