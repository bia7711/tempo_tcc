// Arquivo: back/controllers/authController.js

const Usuario = require('../models/Usuario'); 
const bcrypt = require('bcryptjs'); // Necessário para a comparação de senhas em hash

// Função que processa a requisição POST de cadastro
exports.cadastrarUsuario = async (req, res) => {
    // 1. Recebe os dados do formulário
    const { nome, sobrenome, email, senha, confirmaSenha, cpf } = req.body; // CPF está incluído no destructuring

    // 2. Validações iniciais
    if (senha !== confirmaSenha) {
        // Retorna erro se as senhas não coincidirem
        return res.status(400).json({ mensagem: 'As senhas não coincidem.' });
    }

    // ALTERAÇÃO AQUI: CPF é obrigatório.
    // Garante que nome, sobrenome, email, senha E CPF não estejam vazios.
    if (!nome || !sobrenome || !email || !senha || !cpf) {
        // Retorna erro se faltar algum campo obrigatório
        return res.status(400).json({ mensagem: 'Preencha todos os campos obrigatórios (Nome, Sobrenome, Email, Senha e CPF).' });
    }

    try {
        // 3. Verifica se o email ou CPF já estão cadastrados
        // Usaremos uma query OR na função do modelo para eficiência
        const usuarioExistente = await Usuario.findByEmailOrCpf(email, cpf);

        if (usuarioExistente) {
            let mensagemErro = 'Este email já está cadastrado.';
            if (usuarioExistente.cpf === cpf) {
                mensagemErro = 'Este CPF já está cadastrado.';
            }
            // Retorna status 409 Conflict se o recurso já existir
            return res.status(409).json({ mensagem: mensagemErro });
        }

        // 4. Hash da senha
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        // 5. Cria o novo usuário no banco de dados
        const novoUsuario = await Usuario.create(nome, sobrenome, email, senhaHash, cpf);

        // 6. Resposta de sucesso (Status 201 Created)
        // Por segurança, não retorne a senhaHash
        return res.status(201).json({ 
            mensagem: 'Usuário cadastrado com sucesso!', 
            usuario: {
                id: novoUsuario.id,
                nome: novoUsuario.nome,
                email: novoUsuario.email
                // Outros campos públicos
            }
        });
    } catch (error) {
        console.error('Erro no cadastro de usuário:', error);
        // Retorna erro interno do servidor
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao processar o cadastro.' });
    }
};