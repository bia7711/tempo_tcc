// server.js

// 1. Importar as dependências essenciais
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Configurar o dotenv para carregar o .env (onde estará a porta e credenciais DB)
dotenv.config();

// 2. Inicializar o Express e a porta
const app = express();
// Usa a porta do arquivo .env (se existir) ou a porta 3000 como padrão
const PORT = process.env.PORT || 3001; 

// 3. Configurar Middlewares
// CORS: Permite a comunicação com o Live Server (front-end)
app.use(cors({
    origin: '*', // Permite que o front-end acesse.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

// Para aceitar requisições com JSON no body
app.use(express.json()); 
// Para aceitar dados de formulários
app.use(express.urlencoded({ extended: true })); 

// 4. (Aqui você colocará a lógica das suas Rotas)
// *** SUBSTITUA ESTE COMENTÁRIO PELAS SUAS ROTAS QUANDO FOR A HORA ***
// Exemplo:
// const authRoutes = require('./routes/authRoutes');
// app.use('/api/auth', authRoutes); 

// 5. Iniciar o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express rodando na porta ${PORT}`);
    console.log(`Conexão com o banco de dados será configurada em breve!`);
});