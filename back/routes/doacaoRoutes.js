// back/routes/doacaoRoutes.js

const express = require('express');
const router = express.Router();
// Importa o Controller que contém a lógica de manipulação da doação (Passo 7B)
const doacaoController = require('../controllers/doacaoController'); 

// Rota POST para processar o formulário de doação de duas etapas.
// O Front-end deve enviar os dados (dados pessoais + dados da doação) para este endpoint.
router.post('/registrar', doacaoController.handleDoacao);

module.exports = router;