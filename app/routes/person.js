const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');

router.get('/', personController.getAll);
router.post('/', personController.create);

module.exports = router;
