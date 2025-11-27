// Arquivo: back/server.js

const express = require('express');
const cors = require('cors'); // Necessário para permitir requisições do front-end
const app = express();
const port = 3001; // Porta padrão para o backend

// Importa o arquivo de rotas de autenticação
const authRoutes = require('./routes/authRoutes');
// --- COMENTÁRIO DE INSTRUÇÃO DE BANCO ---
// ATENÇÃO: As rotas estão usando um MOCK de banco de dados
// para simular o armazenamento, garantindo que NENHUM banco de dados real seja linkado AGORA.
// A lógica real de conexão foi desativada no modelo 'usuarios.js'.
// ---------------------------------------

// Middleware: Permite que o servidor aceite dados em formato JSON
app.use(express.json());

// Middleware: Configuração do CORS
// Permite requisições de qualquer origem (ideal para desenvolvimento)
app.use(cors());

// Define as rotas
// Sempre que uma requisição começar com '/api/auth', ela será direcionada para authRoutes
app.use('/api/auth', authRoutes);

// Inicia o servidor Node.js
app.listen(port, () => {
    console.log(`Servidor rodando com sucesso na porta ${port}`);
});