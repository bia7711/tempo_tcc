// back/controllers/contatoController.js

const handleContato = async (req, res) => {
    // 1. Recebe os dados, incluindo o NOVO CAMPO: sobrenome
    const { nome, sobrenome, email, mensagem } = req.body;
    
    // 2. Validação simples: agora verificamos o sobrenome também
    if (!nome || !sobrenome || !email || !mensagem) {
        return res.status(400).json({
            success: false,
            message: "Por favor, preencha todos os campos obrigatórios: Nome, Sobrenome, E-mail e Mensagem."
        });
    }

    try {
        // *** Lógica de Persistência (Será ativada na conexão do DB) ***
        // const Contato = require('../models/contato');
        // await Contato.create({ nome, sobrenome, email, mensagem }); // Adiciona sobrenome aqui também

        console.log(`✅ Contato recebido de ${nome} ${sobrenome}. Salvo com sucesso SIMULADO.`);
        
        return res.status(200).json({
            success: true,
            message: "Mensagem de Contato enviada com sucesso! (Aguardando conexão final do DB)",
            dadosRecebidos: { nome, sobrenome, email }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Erro no servidor ao processar o contato.",
            error: error.message
        });
    }
};

module.exports = {
    handleContato,
};