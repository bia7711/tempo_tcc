// back/controllers/doacaoController.js

const handleDoacao = (req, res) => {
    // 1. Aqui, você pode receber dados de ambas as etapas do formulário.
    // Assumimos que o Front-end envia TUDO o que foi preenchido.
    
    // Exemplos de dados esperados:
    const { nome, email, telefone, valorDoacao, metodoPagamento } = req.body;

    console.log('--- Requisição de Doação Completa Recebida ---');
    console.log(`Dados Pessoais: Nome: ${nome}, E-mail: ${email}`);
    console.log(`Dados da Doação: Valor: ${valorDoacao}, Método: ${metodoPagamento}`);

    // 2. Quando o banco estiver conectado, a lógica de registro no DB virá aqui.

    // 3. Por enquanto, apenas envia uma resposta de sucesso simulada.
    if (!nome || !email || !telefone || !metodoPagamento || !valorDoacao) {
        return res.status(400).json({
            success: false,
            message: "Dados incompletos! Certifique-se de que o nome e o valor da doação foram enviados.",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Dados do Doador e Doação recebidos com sucesso! (Sem conexão DB por enquanto)",
        dadosRecebidos: req.body
    });
};

module.exports = {
    handleDoacao,
};