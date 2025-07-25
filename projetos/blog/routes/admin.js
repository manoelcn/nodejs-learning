import express, { Router } from 'express';
import Categoria from "../models/Categoria.js";

const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
    res.render('admin/index');
});

adminRouter.get('/posts', (req, res) => {
    res.send('Página admin de posts');
});

adminRouter.get('/categorias', (req, res) => {
    Categoria.find().sort({ date: 'desc' }).lean().then((categorias) => {
        res.render('admin/categorias', { categorias: categorias });
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao listar categorias!');
        res.redirect('/admin');
    });

});

adminRouter.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias');
});

adminRouter.post('/categorias/nova', (req, res) => {

    const erros = [];

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: "Nome inválido!" });
    };
    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({ texto: "Slug inválido!" });
    };

    if (erros.length > 0) {
        res.render('admin/addcategorias', { erros: erros });
        return;
    } else {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        };
        new Categoria(novaCategoria).save().then(() => {
            req.flash('success_msg', 'Categoria criada com sucesso!');
            res.redirect('/admin/categorias');
        }).catch((err) => {
            req.flash('error_msg', 'Erro ao salvar categoria!');
            console.log(`Erro ao salvar categoria! ${err}`);
            res.redirect('/admin');
        });
    };
});

adminRouter.get('/categorias/edit/:id', (req, res) => {
    Categoria.findOne({ _id: req.params.id }).lean().then((categoria) => {
        res.render('admin/editcategorias', { categoria: categoria });
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao editar categoria!');
        res.redirect('/admin/categorias');
    })
});

adminRouter.post('/categorias/edit', (req, res) => {
    Categoria.findOne({ _id: req.body.id }).then((categoria) => {
        categoria.nome = req.body.nome;
        categoria.slug = req.body.slug;
        categoria.save().then(() => {
            req.flash('success_msg', 'Categoria editada com sucesso!');
            res.redirect('/admin/categorias');
        }).catch((err) => {
            req.flash('error_msg', 'Erro ao editar categoria!');
            res.redirect('/admin/categorias');
        })
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao editar categoria!');
        res.redirect('/admin/categorias');
    });
});

export default adminRouter;