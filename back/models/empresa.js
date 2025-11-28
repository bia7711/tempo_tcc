// back/models/empresa.js

const mongoose = require('mongoose');

// Define o Schema da Empresa
const EmpresaSchema = new mongoose.Schema({
    nomeEmpresa: {
        type: String,
        required: [true, 'O nome da empresa é obrigatório.'],
        trim: true
    },
    cnpj: {
        type: String,
        required: [true, 'O CNPJ é obrigatório.'],
        unique: true, // Garante que não haja CNPJs duplicados
        trim: true
    },
    email: {
        type: String,
        required: [true, 'O email é obrigatório.'],
        unique: true, // Garante que não haja emails duplicados
        lowercase: true,
        trim: true
    },
    // A senha deve ser armazenada HASHED (criptografada), não em texto puro!
    senha: { 
        type: String,
        required: [true, 'A senha é obrigatória.']
    },
    // Você pode adicionar outros campos (ex: endereço, telefone) aqui
}, 
{
    timestamps: true // Adiciona 'createdAt' e 'updatedAt'
});

// Exporta o Model.
module.exports = mongoose.model('Empresa', EmpresaSchema);