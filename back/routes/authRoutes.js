// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Importa a função do Controller (a sua lógica de cadastro)
const authController = require('../controllers/authController'); 

// 1. Rota de Cadastro
// O endpoint completo será: POST para /api/auth/cadastro
// (O prefixo '/api/auth' é definido no seu server.js)
router.post('/cadastro', authController.cadastrarUsuario); 

// Futuramente, você adicionará a rota de login aqui:
// router.post('/login', authController.loginUsuario); 

// 2. É ESSENCIAL EXPORTAR O OBJETO ROUTER
module.exports = router;