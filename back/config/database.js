// back/config/database.js

const { Sequelize } = require('sequelize');
// PRECISAMOS GARANTIR A LEITURA DO ARQUIVO .ENV
require('dotenv').config(); 

const connection = new Sequelize(
    // 1. Nome do Banco
    process.env.DB_NAME, 
    // 2. Usuário do Banco
    process.env.DB_USER, 
    // 3. Senha do Banco
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false,
    }
);

// OBS: Renomeei 'sequelize' para 'connection' para manter a consistência com os Models
module.exports = connection;