import express, { Router } from 'express';
import Categoria from "../models/Categoria.js";
import Postagem from "../models/Postagem.js";
import { isAdmin } from '../helpers/isAdmin.js';

const adminRouter = express.Router();

adminRouter.get('/', isAdmin, (req, res) => {
    res.render('admin/index');
});


adminRouter.get('/categorias', isAdmin, (req, res) => {
    Categoria.find().sort({ date: 'desc' }).lean().then((categorias) => {
        res.render('admin/categorias', { categorias: categorias });
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao listar categorias!');
        res.redirect('/admin');
    });

});

adminRouter.get('/categorias/add', isAdmin, (req, res) => {
    res.render('admin/addcategorias');
});

adminRouter.post('/categorias/nova', isAdmin, (req, res) => {

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

adminRouter.get('/categorias/edit/:id', isAdmin, (req, res) => {
    Categoria.findOne({ _id: req.params.id }).lean().then((categoria) => {
        res.render('admin/editcategorias', { categoria: categoria });
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao editar categoria!');
        res.redirect('/admin/categorias');
    })
});

adminRouter.post('/categorias/edit', isAdmin, (req, res) => {
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

adminRouter.post('/categorias/deletar', isAdmin, (req, res) => {
    Categoria.deleteOne({ _id: req.body.id }).lean().then(() => {
        req.flash('success_msg', 'Categoria deletada com sucesso!');
        res.redirect('/admin/categorias');
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao deletar categoria!');
        console.log(err);
        res.redirect('/admin/categorias');
    });
});

adminRouter.get('/postagens', isAdmin, (req, res) => {
    Postagem.find().populate('categoria').sort({ data: 'desc' }).lean().then((postagens) => {
        res.render('admin/postagens', { postagens: postagens });
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao listar postagens!');
        console.log(`Erro ao listar categorias: ${err}`);
        res.redirect('/admin');
    });
});

adminRouter.get('/postagens/add', isAdmin, (req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render('admin/addpostagens', { categorias: categorias });
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao carregar formulário!');
        res.redirect('/admin');
    });
});

adminRouter.post('/postagens/nova', isAdmin, (req, res) => {
    const erros = [];

    if (req.body.categoria == '0') {
        erros.push({ texto: 'Categoria inválida!' });
    };

    if (erros.length > 0) {
        res.render('admin/addpostagens', { erros: erros });
    } else {
        const novaPostagem = {
            titulo: req.body.titulo,
            slug: req.body.slug,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria
        };
        new Postagem(novaPostagem).save().then(() => {
            req.flash('success_msg', `Postagem '${req.body.titulo}' criada com sucesso!`);
            res.redirect('/admin/postagens');
        }).catch((err) => {
            req.flash('error_msg', 'Erro ao salvar postagem!');
            console.log(`Erro ao salvar postagem! ${err}`);
            res.redirect('/admin');
        });
    };
});

adminRouter.get('/postagens/edit/:id', isAdmin, (req, res) => {
    Postagem.findOne({ _id: req.params.id }).lean().then((postagem) => {
        Categoria.find().lean().then((categorias) => {
            res.render('admin/editpostagens', { categorias: categorias, postagem: postagem });
        }).catch((err) => {
            req.flash('error_msg', 'Erro ao listar categorias!');
            console.log(`Erro ao listar categorias: ${err}`);
            res.redirect('/admin/postagens');
        });
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao editar postagem!');
        console.log(`Erro ao editar postagem: ${err}`);
        res.redirect('/admin/postagens');
    });
});

adminRouter.post('/postagens/edit', isAdmin, (req, res) => {
    Postagem.findOne({ _id: req.body.id }).then((postagem) => {
        postagem.titulo = req.body.titulo;
        postagem.slug = req.body.slug;
        postagem.descricao = req.body.descricao;
        postagem.conteudo = req.body.conteudo;
        postagem.categoria = req.body.categoria;
        postagem.save().then(() => {
            req.flash('success_msg', 'Postagem editada com sucesso!');
            res.redirect('/admin/postagens');
        }).catch((err) => {
            req.flash('error_msg', 'Erro ao editar postagem!');
            console.log(`Erro ao editar postagem: ${err}`)
            res.redirect('/admin/postagens');
        })
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao editar postagem!');
        console.log(`Erro ao editar postagem: ${err}`);
        res.redirect('/admin/postagens');
    });
});

adminRouter.post('/postagens/deletar', isAdmin, (req, res) => {
    Postagem.deleteOne({ _id: req.body.id }).then(() => {
        req.flash('success_msg', 'Postagem deletada com sucesso!');
        res.redirect('/admin/postagens');
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao deletar postagem!');
        console.log(`Erro ao deletar postagem: ${err}`);
        res.redirect('/admin/postagens');
    });
});

export default adminRouter;