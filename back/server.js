// server.js

// 1. Importar as dependências essenciais
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // <--- NOVO: Importa o módulo 'path' para lidar com caminhos de arquivos

// Configurar o dotenv para carregar o .env
dotenv.config();

// 2. Inicializar o Express e a porta
const app = express();
// Usa a porta do arquivo .env (se existir) ou a porta 3001 como padrão
const PORT = process.env.PORT || 3001; 

// 3. Configurar Middlewares
app.use(cors({
    // Permite a comunicação com o front-end. Mantenha '*' por enquanto.
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

// Para aceitar requisições com JSON no body
app.use(express.json()); 
// Para aceitar dados de formulários
app.use(express.urlencoded({ extended: true })); 

// 4. Servir Arquivos Estáticos do Front-end (CORREÇÃO PARA O ERRO CANNOT GET)
// O '..' sobe um nível da pasta 'back' para a raiz do projeto (onde estão os HTMLs, css, etc.)
const frontendPath = path.join(__dirname, '../');
app.use(express.static(frontendPath)); // <--- NOVO: Diz ao Express para servir arquivos dessa pasta

// 5. Conexão com o Banco de Dados (TEMPORARIAMENTE COMENTADA)
// Comentamos esta seção para que o servidor possa iniciar sem o MySQL.
/*
const sequelize = require('./config/database');
// Esta linha tenta autenticar a conexão ao iniciar o servidor
sequelize.authenticate()
    .then(() => console.log('Conexão com o MySQL estabelecida com sucesso.'))
    .catch(err => console.error('ERRO: Não foi possível conectar ao MySQL.', err));
*/


// 6. Integração das Rotas
// Importa as Rotas de Autenticação (cadastro, login, etc.)
const authRoutes = require('./routes/authRoutes'); 
// Importa as outras rotas que você já tem
const contatoRoutes = require('./routes/contatoRoutes');
const doacaoRoutes = require('./routes/doacaoRoutes');

// Define a URL base para cada conjunto de rotas
// A rota de cadastro será acessível via: POST para /api/auth/cadastro
app.use('/api/auth', authRoutes); 
app.use('/api/contato', contatoRoutes); 
app.use('/api/doacao', doacaoRoutes);


// 7. Iniciar o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express rodando na porta ${PORT}`);
    console.log(`Rotas de autenticação carregadas em: /api/auth`);
});