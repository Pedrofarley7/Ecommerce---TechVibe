const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    preco: { type: Number, required: true },
    imagens: [String], 
    categoria: { type: String },  
    estoque: { type: Number, default: 0 },  
});

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto;