// Arquivo: back/models/Usuario.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const bcrypt = require('bcryptjs'); // Importa o bcrypt para o hook

// Define o modelo 'Usuario' que corresponde à sua tabela 'usuarios' no MySQL
const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    sobrenome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true, // Garante que e-mails duplicados não sejam aceitos
    },
    senha: { 
        type: DataTypes.STRING(255), // Campo para o hash da senha (segurança)
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING(14),
        allowNull: true, // Se for obrigatório, mude para 'false'
        unique: true,
    },
}, {
    tableName: 'usuarios', 
    timestamps: true, // Adiciona colunas createdAt e updatedAt
});

// Hook (Gatilho) para criptografar a senha antes de salvar/atualizar
Usuario.beforeCreate(async (usuario) => {
    if (usuario.senha) {
        const salt = await bcrypt.genSalt(10);
        usuario.senha = await bcrypt.hash(usuario.senha, salt);
    }
});

// Sincroniza o modelo com o banco de dados (cria a tabela 'usuarios' se ela não existir)
Usuario.sync();

module.exports = Usuario;