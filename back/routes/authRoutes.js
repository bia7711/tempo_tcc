// Arquivo: /back/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const path = require('path');
const {
    cadastrarEmpresa,
    cadastrarVoluntario,
    loginEmpresa,
    loginVoluntario,
    verificarEmpresa,
    verificarVoluntario
} = require('../controllers/authcontroller');

// --- ROTAS DE AUTENTICAÇÃO ---

router.post('/register/empresa', cadastrarEmpresa);
router.post('/register/voluntario', cadastrarVoluntario);
router.post('/login/empresa', loginEmpresa);
router.post('/login/voluntario', loginVoluntario);

// --- ROTAS PROTEGIDAS (Middleware em Ação!) ---

// 1. Rota para a área restrita da Empresa:
// Se não for 'empresa', o middleware bloqueia antes de tentar enviar o HTML.
router.get('/empresas', verificarEmpresa, (req, res) => {
    // Caminho para o HTML estático na raiz do projeto (TEMPO_TCC):
    res.sendFile(path.join(__dirname, '..', '..', 'empresas.html')); 
});

// 2. Rota para a área restrita do Voluntário:
// Se não for 'voluntario', o middleware bloqueia antes de tentar enviar o HTML.
router.get('/voluntarios', verificarVoluntario, (req, res) => {
    // Caminho para o HTML estático na raiz do projeto (TEMPO_TCC):
    res.sendFile(path.join(__dirname, '..', '..', 'voluntarios.html'));
});

module.exports = router;