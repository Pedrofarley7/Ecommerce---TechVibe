const express = require('express');
const router = express.Router();

// Usuário e senha predefinidos
const adminUsername = process.env.USUARIO_ADMIN;
const adminPassword = process.env.SENHA_ADMIN;

// Página de login
router.get('/', (req, res) => {
    res.render('login'); // Renderiza a página de login
});

// Verificação de login
router.post('/', (req, res) => {
    const { username, password } = req.body;

    if (username === adminUsername && password === adminPassword) {
        // Usuário autenticado, pode acessar a página de administração
        res.redirect('/admin');
    } else {
        // Usuário ou senha incorretos, exibe mensagem de erro
        res.send('Usuário ou senha incorretos!');
    }
});

module.exports = router;