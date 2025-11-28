// 1. Importar as dependências essenciais
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session'); // <--- NOVO: Importa o gerenciador de sessões

// Configurar o dotenv para carregar o .env
dotenv.config();

// 2. Inicializar o Express e a porta
const app = express();
// Usa a porta do arquivo .env (se existir) ou a porta 3001 como padrão
const PORT = process.env.PORT || 3001; 

// 3. Configurar Middlewares

// ** NOVO: Configuração da Sessão **
app.use(session({
    secret: process.env.SESSION_SECRET || 'sua_chave_secreta_padrao', // Chave para assinar o cookie. Mude a string padrão!
    resave: false, // Evita salvar sessões que não foram modificadas
    saveUninitialized: false, // Evita criar sessões vazias
    cookie: { 
        secure: process.env.NODE_ENV === 'production', // Use 'true' em produção (HTTPS)
        maxAge: 1000 * 60 * 60 * 24 // Duração de 1 dia (em milissegundos)
    }
}));
// --- Fim da Configuração da Sessão ---

app.use(cors({
    // Permite a comunicação com o front-end. Mantenha '*' por enquanto.
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

// Para aceitar requisições com JSON no body
app.use(express.json()); 
// Para aceitar dados de formulários
app.use(express.urlencoded({ extended: true })); 

// 4. Servir Arquivos Estáticos do Front-end
const frontendPath = path.join(__dirname, '../');
app.use(express.static(frontendPath)); 

// 5. Conexão com o Banco de Dados (TEMPORARIAMENTE COMENTADA)
// Lógica de autenticação com sequelize... (mantida comentada)
/*
const sequelize = require('./config/database');
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
app.use('/api/auth', authRoutes); // Rotas de autenticação (cadastro/login)
app.use('/api/contato', contatoRoutes); 
app.use('/api/doacao', doacaoRoutes);


// 7. Iniciar o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express rodando na porta ${PORT}`);
    console.log(`Rotas de autenticação carregadas em: /api/auth`);
});