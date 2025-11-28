// Este arquivo contém a lógica (Controllers) para todas as rotas de autenticação.

// =================================================================
// 1. MIDDLEWARES DE PROTEÇÃO (Porteiros)
// =================================================================

// Middleware para proteger rotas de Empresas
const verificarEmpresa = (req, res, next) => {
    // Checa se a sessão existe E se o tipo de usuário é 'empresa'
    if (req.session.userType === 'empresa') {
        next(); // Permite o acesso se for uma empresa
    } else {
        // Bloqueia e redireciona (ou retorna 403 se for uma chamada API)
        return res.status(403).redirect('/'); 
    }
};

// Middleware para proteger rotas de Voluntários
const verificarVoluntario = (req, res, next) => {
    // Checa se a sessão existe E se o tipo de usuário é 'voluntario'
    if (req.session.userType === 'voluntario') {
        next(); // Permite o acesso se for um voluntário
    } else {
        // Bloqueia e redireciona
        return res.status(403).redirect('/');
    }
};


// =================================================================
// 2. CADASTRO (Cria a conta e a SESSÃO)
// =================================================================

// Funções de cadastro
const cadastrarEmpresa = async (req, res) => {
    const { nomeEmpresa, cnpj, email, senha, confirmaSenha } = req.body;

    // --- Lógica de Validação e DB AQUI ---
    if (!nomeEmpresa || !cnpj || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }
    if (senha !== confirmaSenha) {
        return res.status(400).json({ mensagem: 'As senhas não coincidem.' });
    }
    
    // ATENÇÃO: A lógica de SALVAR NO BANCO DE DADOS deve ser adicionada aqui.

    // Se o cadastro for bem-sucedido:
    req.session.userType = 'empresa'; // CRIA A SESSÃO e define o tipo
    req.session.email = email;
    req.session.nome = nomeEmpresa; 

    // Redireciona para a área protegida da empresa.
    return res.redirect('/empresas.html');
};

const cadastrarVoluntario = async (req, res) => {
    const { nome, sobrenome, cpf, email, senha, confirmaSenha } = req.body;

    // --- Lógica de Validação e DB AQUI ---
    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }
    if (senha !== confirmaSenha) {
        return res.status(400).json({ mensagem: 'As senhas não coincidem.' });
    }

    // ATENÇÃO: A lógica de SALVAR NO BANCO DE DADOS deve ser adicionada aqui.

    // Se o cadastro for bem-sucedido:
    req.session.userType = 'voluntario'; // CRIA A SESSÃO e define o tipo
    req.session.email = email;
    req.session.nome = nome; 

    // Redireciona para a área protegida do voluntário.
    return res.redirect('/voluntarios.html'); 
};


// =================================================================
// 3. LOGIN (Define a SESSÃO se o usuário existe)
// =================================================================

// Funções de login (Lógica de DB pendente)
const loginEmpresa = async (req, res) => {
    const { email, senha } = req.body;
    
    // ATENÇÃO: Lógica de BUSCA E VERIFICAÇÃO DE SENHA NO BANCO DE DADOS AQUI.
    
    // SIMULAÇÃO: Se o login for bem-sucedido
    if (email === 'teste@empresa.com' && senha === '123') { 
        req.session.userType = 'empresa';
        req.session.email = email;
        req.session.nome = 'Empresa Teste';
        return res.redirect('/empresas.html');
    }
    
    return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
};

const loginVoluntario = async (req, res) => {
    const { email, senha } = req.body;

    // ATENÇÃO: Lógica de BUSCA E VERIFICAÇÃO DE SENHA NO BANCO DE DADOS AQUI.

    // SIMULAÇÃO: Se o login for bem-sucedido
    if (email === 'teste@voluntario.com' && senha === '123') {
        req.session.userType = 'voluntario';
        req.session.email = email;
        req.session.nome = 'Voluntário Teste';
        return res.redirect('/voluntarios.html');
    }
    
    return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
};


// =================================================================
// 4. API DE INFORMAÇÃO (Para o Mini Perfil)
// =================================================================

// Rota para checar o status de login (pública)
const verificarStatus = (req, res) => {
    if (req.session.userType) {
        return res.json({ 
            isLoggedIn: true, 
            userType: req.session.userType,
            nome: req.session.nome 
        });
    } else {
        return res.json({ 
            isLoggedIn: false 
        });
    }
};

// Rota para buscar dados do perfil (protegida)
const buscarDadosPerfil = (req, res) => {
    
    // ATENÇÃO: Lógica de BUSCA DE DADOS DO BANCO DE DADOS AQUI.
    // Por enquanto, retorna a simulação:
    const dadosSimulados = {
        nome: req.session.nome || 'Voluntário do Florescer',
        email: req.session.email,
        acoesAtivas: [
            { id: 1, nome: 'Reflorestamento e Preservação', status: 'Ativo' },
            { id: 2, nome: 'Cultivo e Estufas Comunitárias', status: 'Candidato' },
        ],
        miniPerfilDescricao: 'Pronto para plantar!',
    };

    return res.json(dadosSimulados);
};


// =================================================================
// 5. EXPORTAÇÃO
// =================================================================

module.exports = {
    verificarEmpresa,
    verificarVoluntario,
    cadastrarEmpresa,
    cadastrarVoluntario,
    loginEmpresa,
    loginVoluntario,
    verificarStatus, 
    buscarDadosPerfil 
};