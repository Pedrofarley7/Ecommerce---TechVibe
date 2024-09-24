const express = require('express');
const router = express.Router();
const prodControlador = require('../Admin/ProdControlador');


// Página de administração (lista produtos)
router.get('/', prodControlador.adminDashboard);

// Formulário para adicionar um novo produto
router.get('/add', prodControlador.addProdutoForm);
router.post('/add', prodControlador.addProduto);

// Formulário para editar um produto
router.get('/edit/:id', prodControlador.editProdutoForm);
router.post('/edit/:id', prodControlador.editProduto);

// Excluir um produto
router.post('/delete/:id', prodControlador.deleteProduto);

module.exports = router;