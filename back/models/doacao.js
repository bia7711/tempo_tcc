// js/doacao.js

// ------------------------------------------------------------------
// Lógica para MUDANÇA DE ETAPAS (Baseado no seu HTML)
// ------------------------------------------------------------------
function proximaEtapa() {
    const etapa1 = document.getElementById('etapa1');
    const etapa2 = document.getElementById('etapa2');

    // Validação dos campos obrigatórios da Etapa 1
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const termos = document.getElementById('termos').checked;
    
    if (!nome || !email || !termos) {
        alert('Por favor, preencha o Nome, Email e aceite os Termos para continuar.');
        return;
    }

    // Passa para a Etapa 2
    etapa1.style.display = 'none';
    etapa2.style.display = 'block';
}

// Lógica para mostrar o campo de "Outro Valor"
document.querySelectorAll('input[name="valorDoacao"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const outroValorInput = document.getElementById('outro-valor-input');
        if (this.value === 'Outro') {
            outroValorInput.style.display = 'block';
            document.getElementById('valorPersonalizado').required = true;
        } else {
            outroValorInput.style.display = 'none';
            document.getElementById('valorPersonalizado').required = false;
        }
    });
});

// ------------------------------------------------------------------
// Lógica para ENVIO DOS DADOS (Comunicação com o Back-end)
// ------------------------------------------------------------------
const doacaoForm = document.getElementById('doacaoForm');

doacaoForm.addEventListener('submit', async function(event) {
    // 1. Previne o envio padrão do formulário que recarrega a página
    event.preventDefault();

    // 2. Coleta todos os dados do formulário
    const formData = new FormData(doacaoForm);
    const dados = {};
    formData.forEach((value, key) => {
        // Trata o valor da doação se for personalizado
        if (key === 'valorPersonalizado' && value) {
            dados['valorDoacao'] = value;
        } else if (key !== 'valorPersonalizado') {
             dados[key] = value;
        }
    });
    
    // URL CORRETA BASEADA NO SEU ROUTES.JS: /api/doacao/registrar
    const url = 'http://localhost:3001/api/doacao/registrar'; 
    
    console.log('Dados enviados para o Back-end:', dados);

    try {
        // 3. Envia os dados para o Back-end
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        // 4. Trata a Resposta
        const resultado = await response.json();

        if (response.ok) {
            // Sucesso (Status 200 do seu Controller)
            alert('DOAÇÃO RECEBIDA COM SUCESSO! ' + resultado.message);
            doacaoForm.reset(); 
            // Opcional: Voltar para a Etapa 1
            document.getElementById('etapa1').style.display = 'block';
            document.getElementById('etapa2').style.display = 'none';
        } else {
            // Erro (Status 400 ou 500 do seu Controller)
            alert('ERRO ao processar a doação: ' + (resultado.message || 'Erro desconhecido.'));
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro de conexão com o servidor. Verifique se o Back-end está rodando.');
    }
});