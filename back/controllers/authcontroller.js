// Arquivo: back/controllers/authController.js

// 1. IMPORTAÇÕES
// Garanta que o caminho para o seu model 'Usuario.js' esteja correto:
const Usuario = require('../models/usuario'); 
const bcrypt = require('bcryptjs'); // Necessário para a comparação de senhas em futuros logins

// Função que processa a requisição POST de cadastro
exports.cadastrarUsuario = async (req, res) => {
    // 1. Recebe os dados do formulário
    const { nome, sobrenome, email, senha, confirmaSenha, cpf } = req.body;

    // 2. Validações iniciais
    if (senha !== confirmaSenha) {
        // Retorna erro se as senhas não coincidirem
        return res.status(400).json({ mensagem: 'As senhas não coincidem.' });
    }

    // Verifica a obrigatoriedade dos campos
    if (!nome || !sobrenome || !email || !senha) {
        // Retorna erro se faltar algum campo obrigatório
        return res.status(400).json({ mensagem: 'Preencha todos os campos obrigatórios.' });
    }

    try {
        // 3. Verifica se o E-mail já existe
        let usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(409).json({ mensagem: 'E-mail já cadastrado.' });
        }
        
        // Verifica se o CPF já existe
        if (cpf) {
            usuarioExistente = await Usuario.findOne({ where: { cpf } });
            if (usuarioExistente) {
                 return res.status(409).json({ mensagem: 'CPF já cadastrado.' });
            }
        }
        
        // 4. Cria o novo usuário.
        // A senha será criptografada automaticamente pelo 'hook' no Usuario.js ANTES de ir para o DB.
        const novoUsuario = await Usuario.create({
            nome,
            sobrenome,
            email,
            senha, // O model cuidará do hash
            cpf, 
        });

        // 5. Resposta de Sucesso (Status 201 Created)
        return res.status(201).json({ 
            mensagem: 'Usuário cadastrado com sucesso!', 
            usuario: { 
                id: novoUsuario.id, 
                nome: novoUsuario.nome,
                email: novoUsuario.email 
            }
        });

    } catch (error) {
        // 6. Resposta de Erro no Servidor
        console.error('Erro no cadastro:', error.message);
        // Retorna um erro 500 para qualquer problema inesperado com o banco ou servidor
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao tentar cadastrar.' });
    }
};

// Futuramente, as funções de login e logout virão aqui.
// exports.loginUsuario = async (req, res) => { ... };