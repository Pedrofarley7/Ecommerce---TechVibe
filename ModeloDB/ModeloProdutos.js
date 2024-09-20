const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    preco: { type: Number, required: true },
    imagens: [String],  // Array de URLs das imagens
    categoria: { type: String },  // Opcional
    estoque: { type: Number, default: 0 },  // Opcional
});

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto;