// back/models/contato.js

const { DataTypes } = require('sequelize');
const connection = require('../config/database'); 

const Contato = connection.define('Contato', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nome: { // Primeiro nome
        type: DataTypes.STRING,
        allowNull: false,
    },
    sobrenome: { // <--- NOVO CAMPO!
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    mensagem: {
        type: DataTypes.TEXT, 
        allowNull: true, 
    },
}, {
    tableName: 'contatos',
    freezeTableName: true,
});

module.exports = Contato;