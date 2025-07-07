import express from 'express';
import Categoria from "../models/Categoria.js";

const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
    res.render('admin/index');
});

adminRouter.get('/posts', (req, res) => {
    res.send('Página admin de posts');
});

adminRouter.get('/categorias', (req, res) => {
    res.render('admin/categorias');
});

adminRouter.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias');
});

adminRouter.post('/categorias/nova', (req, res) => {
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    };
    new Categoria(novaCategoria).save().then(() => {
        console.log('Categoria salva com sucesso!');
    }).catch((err) => {
        console.log(`Erro ao salvar categoria! ${err}`);
    });
});

export default adminRouter;