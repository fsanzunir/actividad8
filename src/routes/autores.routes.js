const express = require('express');
const router = express.Router();
const autoresController = require('../controllers/autores.controller');

router.get('/',     autoresController.getAll);
router.get('/:id',  autoresController.getById);
router.post('/',    autoresController.create);
router.get('/:id/posts', autoresController.getPostsByAutor);

module.exports = router;