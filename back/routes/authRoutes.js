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
    verificarVoluntario,
    // --- NOVO: IMPORTAR AS FUNÇÕES DE STATUS DO CONTROLLER ---
    verificarStatus, 
    // buscarDadosPerfil // Vamos adicionar a rota dela também
} = require('../controllers/authcontroller');

// --- ROTAS DE AUTENTICAÇÃO ---

router.post('/register/empresa', cadastrarEmpresa);
router.post('/register/voluntario', cadastrarVoluntario);
router.post('/login/empresa', loginEmpresa);
router.post('/login/voluntario', loginVoluntario);

// --- ROTAS DE API PARA O MINI PERFIL (PÚBLICA) ---
// O URL completo será: /api/auth/status
router.get('/status', verificarStatus); // <--- ROTA CRÍTICA ADICIONADA!
// router.get('/perfil', verificarVoluntario, buscarDadosPerfil); // Rota protegida do Mini Perfil

// --- ROTAS PROTEGIDAS (Middleware em Ação!) ---

// 1. Rota para a área restrita da Empresa:
router.get('/empresas', verificarEmpresa, (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'empresas.html')); 
});

// 2. Rota para a área restrita do Voluntário:
router.get('/voluntarios', verificarVoluntario, (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'voluntarios.html'));
});

module.exports = router;