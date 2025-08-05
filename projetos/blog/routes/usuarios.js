import express from 'express';
import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import passport from 'passport';

const userRouter = express.Router();

userRouter.get('/registro', (req, res) => {
    res.render('usuarios/registro');
});

userRouter.post('/registro', (req, res) => {
    const erros = [];

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: 'Nome inválido!' });
    };

    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({ texto: 'E-mail inválido!' });
    };

    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({ texto: 'Senha inválida!' });
    };

    if (req.body.senha.length < 4) {
        erros.push({ texto: 'Senha muito curta!' });
    };

    if (req.body.senha != req.body.senha2) {
        erros.push({ texto: 'As senhas são diferentes! Tente novamente.' });
    };

    if (erros.length > 0) {
        res.render('usuarios/registro', { erros: erros });
    } else {
        Usuario.findOne({ email: req.body.email }).then((usuario) => {
            if (usuario) {
                req.flash('error_msg', 'E-mail já cadastrado!');
                res.redirect('/usuarios/registro');
            } else {
                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                });
                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if (erro) {
                            req.flash('error_msg', 'Erro ao salvar usuário!');
                            res.redirect('/')
                        };
                        novoUsuario.senha = hash;
                        novoUsuario.save().then(() => {
                            req.flash('success_msg', 'Usuário criado com sucesso!');
                            res.redirect('/');
                        }).catch((err) => {
                            req.flash('error_msg', 'Erro ao salvar usuário!');
                            console.log(`Erro ao salvar usuário! ${err}`);
                            res.redirect('/usuarios/registro');
                        });
                    });
                });
            };
        }).catch((err) => {
            req.flash('error_msg', 'Erro interno!');
            res.redirect('/');
        });
    };
});

userRouter.get('/login', (req, res) => {
    res.render('usuarios/login');
});

userRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/usuarios/login',
        failureFlash: true
    })(req, res, next);
});

userRouter.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); };
        req.flash('success_msg', 'Deslogado com sucesso!');
        res.redirect('/');
    });
});

export default userRouter;