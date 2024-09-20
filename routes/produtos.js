const express = require('express');
const router = express.Router();
const Produto = require('../ModeloDB/ModeloProdutos'); // Ajuste o caminho para o seu modelo de produto

// Rota para mostrar todos os produtos ou filtrar por categoria
router.get('/', async (req, res) => {
    try {
        const categoria = req.query.categoria; // Obtém a categoria da query string
        let produtos;

        if (categoria && categoria !== '') {
            // Se uma categoria for selecionada, filtra os produtos por categoria
            produtos = await Produto.find({ categoria: categoria });
        } else {
            // Se nenhuma categoria for selecionada, exibe todos os produtos
            produtos = await Produto.find();
        }

        res.render('produtos', { produtos });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar produtos');
    }
});

// Rota para mostrar detalhes de um produto específico
router.get('/:id', async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) {
            return res.status(404).send('Produto não encontrado');
        }
        res.render('produto-detalhes', { produto });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar produto');
    }
});

module.exports = router;
