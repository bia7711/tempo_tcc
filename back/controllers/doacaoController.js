// controllers/doacaoController.js

// Importações (Mantemos comentadas para a simulação, mas prontas para o futuro)
// const Doacao = require('../models/doacao'); 

// ------------------------------------------------------------------
// 1. Lógica para Registrar Doação
// ------------------------------------------------------------------
exports.registrarDoacao = async (req, res) => {
    
    // O Nodemon deve estar mostrando os dados no terminal (req.body)
    const dadosDoacao = req.body;

    console.log('--- Requisição de Doação Completa Recebida (COM VALIDAÇÃO) ---');
    console.log('Dados Recebidos:', dadosDoacao);
    
    // Desestruturação dos dados para facilitar a validação
    const { 
        nome, 
        email, 
        valorDoacao, 
        documento, 
        recorrencia, 
        formaPagamento 
    } = dadosDoacao;

    // ------------------------------------------------------------------
    // 2. VALIDAÇÃO DOS DADOS ANTES DE ACESSAR O BANCO
    // ------------------------------------------------------------------

    // Verifica campos obrigatórios básicos (Segurança do Back-end)
    if (!nome || !email || !valorDoacao || !documento || !recorrencia || !formaPagamento) {
        console.error('ERRO DE VALIDAÇÃO: Campos obrigatórios faltando.');
        // Retorna o erro 400 (Bad Request) para o Front-end
        return res.status(400).json({ 
            message: 'Erro: Campos essenciais (nome, email, valor, documento, recorrência, pagamento) não foram fornecidos.' 
        });
    }

    // Validação específica do valor (garante que é um número positivo)
    const valorNumerico = parseFloat(valorDoacao);

    if (isNaN(valorNumerico) || valorNumerico <= 0) {
        console.error('ERRO DE VALIDAÇÃO: Valor de doação inválido.');
         // Retorna o erro 400 (Bad Request)
        return res.status(400).json({ 
            message: 'Erro: O valor da doação deve ser um número positivo.' 
        });
    }

    // ------------------------------------------------------------------
    // 3. SIMULAÇÃO DE SALVAMENTO NO BANCO DE DADOS (Simulado)
    // ------------------------------------------------------------------
    
    try {
        /*
        // QUANDO VOCÊ ATIVAR O SEQUELIZE, DESCOMENTE ESTA PARTE:
        const novaDoacao = await Doacao.create({
            nome: nome,
            email: email,
            valor: valorNumerico,
            documento: documento,
            // ... outros campos ...
        });
        
        console.log('✅ Doação salva no banco de dados com ID:', novaDoacao.id);
        */

        // Resposta de sucesso (Simulada)
        console.log(`✅ Doação de R$${valorNumerico.toFixed(2)} recebida com sucesso (SIMULADO).`);
        
        // Retorna o status 200 (OK) para o Front-end
        return res.status(200).json({ 
            message: `Doação de R$${valorNumerico.toFixed(2)} de ${nome} recebida para processamento.`,
            statusSimulado: 'Simulado e Validado'
        });

    } catch (error) {
        // Se houver qualquer erro inesperado no servidor ou no banco
        console.error('❌ ERRO INESPERADO ao processar a doação:', error);
        return res.status(500).json({ 
            message: 'Erro interno do servidor ao registrar a doação.',
            error: error.message 
        });
    }
};

// ------------------------------------------------------------------
// 4. Lógica para Registrar Contato (Apenas para referência, se precisar)
// ------------------------------------------------------------------
exports.registrarContato = async (req, res) => {
    const { nome, email, mensagem } = req.body;
    
    // Apenas para mostrar no console que está funcionando
    console.log(`✅ Contato recebido de ${nome}. Salvo com sucesso SIMULADO.`);

    // Retorna uma resposta simples de sucesso
    return res.status(200).json({ 
        message: 'Contato recebido com sucesso (Simulado).',
        statusSimulado: 'OK'
    });
};