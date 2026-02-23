const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');
const authMiddleware = require('../middleware/auth'); // Importa il middleware

// Applica il middleware a tutte le rotte di questo file
router.use(authMiddleware);

// Ora queste rotte sono protette
router.get('/', personController.getAll);
router.post('/', personController.create);

module.exports = router;
