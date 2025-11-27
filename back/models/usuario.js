// Arquivo: back/models/Usuario.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const bcrypt = require('bcryptjs'); // Importa o bcrypt para o hook

// Define o modelo 'Usuario' que corresponde à sua tabela 'usuarios' no MySQL
const Usuario = sequelize.define('Usuario', {
    // ... suas definições de campos ...
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
        unique: true, 
    },
    senha: { 
        type: DataTypes.STRING(255), 
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING(14),
        allowNull: true,
        unique: true,
    },
}, {
    tableName: 'usuarios', 
    timestamps: true,
});

// Hook (Gatilho) para criptografar a senha antes de salvar/atualizar
Usuario.beforeCreate(async (usuario) => {
    if (usuario.senha) {
        const salt = await bcrypt.genSalt(10);
        usuario.senha = await bcrypt.hash(usuario.senha, salt);
    }
});

// COMENTADO TEMPORARIAMENTE: Esta linha força a conexão com o DB.
// Você pode descomentá-la (ou usar o sequelize.sync() no server.js) quando for conectar o banco.
// Usuario.sync(); 

module.exports = Usuario;