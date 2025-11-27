// routes/contatoRoutes.js
const express = require('express');
const router = express.Router();

// Importa a função do Controller
const contatoController = require('../controllers/contatoController'); 

// Define que requisições POST para '/api/contato/enviar' serão tratadas pelo Controller
// CORREÇÃO: Usando a função exportada corretamente: handleContato
router.post('/enviar', contatoController.handleContato);

module.exports = router;