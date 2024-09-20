const Produto = require('../ModeloDB/ModeloProdutos');
const path = require('path');
const multer = require('multer');

// Configuração do multer para salvar os arquivos localmente
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // Pasta onde os arquivos serão salvos
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Nome único para cada arquivo
    }
});

const upload = multer({ storage: storage });

// Página de administração (lista produtos)
exports.adminDashboard = async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.render('admin/dashboard', { produtos });
    } catch (error) {
        res.status(500).send('Erro ao carregar o painel de administração');
    }
};

// Formulário para adicionar um novo produto
exports.addProdutoForm = (req, res) => {
    res.render('admin/addProduto');
};

// Adicionar um novo produto com múltiplas imagens
exports.addProduto = [
    upload.array('imagens', 10), // Middleware do multer para upload de múltiplas imagens
    async (req, res) => {
        const { nome, descricao, preco, categoria, estoque } = req.body;
        const imagens = req.files.map(file => `/uploads/${file.filename}`); // Caminho das imagens salvas

        try {
            const novoProduto = new Produto({ nome, descricao, preco, imagens, categoria, estoque });
            await novoProduto.save();
            res.redirect('/admin');
        } catch (error) {
            res.status(500).send('Erro ao adicionar produto');
        }
    }
];

// Formulário para editar um produto
exports.editProdutoForm = async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) return res.status(404).send('Produto não encontrado');
        res.render('admin/editProduto', { produto });
    } catch (error) {
        res.status(500).send('Erro ao carregar formulário de edição');
    }
};

// Editar um produto existente
exports.editProduto = [
    upload.array('imagens', 10), // Middleware do multer para upload de múltiplas imagens (opcional, se você quiser permitir a adição de novas imagens durante a edição)
    async (req, res) => {
        const { nome, descricao, preco, categoria, estoque } = req.body;
        const imagens = req.files ? req.files.map(file => `/uploads/${file.filename}`) : []; // Atualiza imagens se novas forem enviadas

        try {
            const updateData = { nome, descricao, preco, categoria, estoque };
            if (imagens.length > 0) {
                updateData.imagens = imagens;
            }
            await Produto.findByIdAndUpdate(req.params.id, updateData);
            res.redirect('/admin');
        } catch (error) {
            res.status(500).send('Erro ao atualizar produto');
        }
    }
];

// Excluir um produto
exports.deleteProduto = async (req, res) => {
    try {
        await Produto.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (error) {
        res.status(500).send('Erro ao excluir produto');
    }
};
