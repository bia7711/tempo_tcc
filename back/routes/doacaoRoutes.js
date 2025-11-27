// back/routes/doacaoRoutes.js

const express = require('express');
const router = express.Router();

// Importa o Controller que contém a lógica de manipulação da doação
const doacaoController = require('../controllers/doacaoController'); 

// Rota POST para processar o formulário de doação de duas etapas.
// Agora usa o nome de função correto: registrarDoacao
router.post('/registrar', doacaoController.registrarDoacao);

module.exports = router;