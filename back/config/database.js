// Arquivo: back/config/database.js

const { Sequelize } = require('sequelize');

// Configuração do MySQL usando Sequelize
// **ATENÇÃO: Mude 'nome_do_banco', 'usuario_db', e 'senha_db' pelos seus dados reais!**
const sequelize = new Sequelize('nome_do_banco', 'usuario_db', 'senha_db', {
    host: 'localhost', // Mude se o banco de dados não estiver na sua máquina local
    dialect: 'mysql',
    logging: false, // Define para 'true' se quiser ver as queries SQL no console
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

module.exports = sequelize;