import express from 'express';
const admin = express.Router();

router.get('/', (req, res) => {
    res.send('Página de ADMIN');
});

router.get('/posts', (req, res) => {
    res.send('Página admin de posts');
});

router.get('/categorias', (req, res) => {
    res.send('Página admin de categorias');
});

export default admin;